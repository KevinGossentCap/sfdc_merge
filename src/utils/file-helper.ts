import * as fs from 'fs'
import * as path from 'path'
import * as es from 'event-stream'
// import * as xml2js from 'xml2js'
import * as xmljs from 'xml-js'
import {buildUniqueKey} from '../utils/merge-helper'
import {startTimer, endTimer} from '../utils/verbose-helper'
import {constants} from '../utils/constants'
import * as _ from 'lodash'
import {getSupportedMeta, getMetaConfig} from '../utils/generic-meta-node'

const fsp = fs.promises
const regGenericMatch = /(?<=<)(\w+)(?= +xmlns)/
const optXml2js = {compact: true, textKey: '_', attributesKey: '$'}
const optJs2xml = {compact: true, textKey: '_', attributesKey: '$', spaces: 4}

// const builder = new xml2js.Builder({
//   xmldec: {version: '1.0', encoding: 'UTF-8'},
//   renderOpts: {pretty: true, indent: '    ', newline: '\n'},
//   xmlns: true,
// })

export async function allFilesExist(files: string[]) {
  return Promise.all(files.map((file) => fsp.access(file, fs.constants.F_OK)))
}

async function getMetafromFile(file) {
  return new Promise((resolve) => {
    let output
    const s = fs
      .createReadStream(file)
      .pipe(es.split())
      .pipe(
        es.mapSync(function (line) {
          const match = line.match(regGenericMatch)
          if (match !== null) {
            output = match[0]
            s.destroy()
          }
        }),
      )
      .on('close', () => {
        resolve(output)
      })
  })
}

function getConfigPath(meta) {
  return path.join(
    __dirname,
    '..',
    '..',
    'conf',
    'merge-' + meta.toLowerCase() + '-config.json',
  )
}

export async function getMetaConfigJSON(meta) {
  return fsp
    .readFile(getConfigPath(meta), {flag: 'r', encoding: 'utf8'})
    .then((data) => {
      return JSON.parse(data)
    })
}

export async function getMetadataType(files: string[]) {
  return Promise.all(
    files.map((file) => {
      return getMetafromFile(file)
    }),
  ).then((data) => {
    data = data.filter((el, i, a) => el !== undefined && i === a.indexOf(el))
    if (data.length > 1) {
      throw constants.ERR_META_MULTI
    }
    const filteredData = data.filter(
      (el, i, a) => el !== undefined && i === a.indexOf(el),
    )
    return filteredData[0]
  })
}

function getNodeBaseJSON(meta) {
  const result = {}
  // eslint-disable-next-line dot-notation
  result['_declaration'] = {$: {version: '1.0', encoding: 'UTF-8'}}
  switch (meta) {
    default:
      result[meta] = {$: {xmlns: 'http://soap.sforce.com/2006/04/metadata'}}
      return result
  }
}

export async function getKeyedFiles(
  files: string[],
  meta,
  configJson,
  level: number,
) {
  return Promise.all(
    files.map((file, index) => {
      startTimer(
        ['file:', file, 'index:', index.toString().padStart(3), 'reading'],
        level,
        2,
      )
      return fsp
        .readFile(file, {flag: 'r', encoding: 'utf8'})
        .then((data) => {
          endTimer(
            ['file:', file, 'index:', index.toString().padStart(3), 'reading'],
            level,
            2,
          )
          startTimer(
            [
              'file:',
              file,
              'index:',
              index.toString().padStart(3),
              'parsing xml',
            ],
            level,
            2,
          )
          const xmljsResult = xmljs.xml2js(data, optXml2js)
          endTimer(
            [
              'file:',
              file,
              'index:',
              index.toString().padStart(3),
              'parsing xml',
            ],
            level,
            2,
          )
          return xmljsResult
        })
        .then((result) => {
          if (result[meta]) {
            return result[meta]
          }
          return {}
        })
        .then((data) => {
          startTimer(
            ['file:', file, 'index:', index.toString().padStart(3), 'keying'],
            level,
            2,
          )
          const keyedTab = []
          for (const localType of Object.keys(data)) {
            const result = []
            let nodelist = data[localType]
            if (!Array.isArray(nodelist)) {
              nodelist = [nodelist]
            }
            nodelist.forEach((node) => {
              const uniqueNodeKey = buildUniqueKey(node, localType, configJson)
              if (uniqueNodeKey) {
                result[uniqueNodeKey] = {
                  nodeType: localType,
                  node: node,
                }
              }
            })
            Object.assign(keyedTab, result)
          }
          endTimer(
            ['file:', file, 'index:', index.toString().padStart(3), 'keying'],
            level,
            2,
          )
          return keyedTab
        })
    }),
  )
}

export async function writeOutput(meta, file, jsonOutput) {
  const base = getNodeBaseJSON(meta)
  Object.assign(base[meta], jsonOutput)
  if (file !== undefined && file !== '') {
    fsp.writeFile(file, xmljs.js2xml(base, optJs2xml).concat('\n'), {
      encoding: 'utf8',
    })
  } else {
    console.log('joined:', JSON.stringify(base))
  }
}

export async function getGenericConfigJSON() {
  return fsp
    .readFile(path.join(__dirname, '..', '..', 'conf', 'generic-config.json'), {
      flag: 'r',
      encoding: 'utf8',
    })
    .then((data) => {
      return JSON.parse(data)
    })
}

function deepSort(obj, configJson) {
  if (!Array.isArray(obj) && typeof obj === 'object') {
    for (const key of _.keys(obj)) {
      if (Array.isArray(obj[key])) {
        if (configJson[key] && configJson[key].mdtype.keys) {
          obj[key] = _.sortBy(
            obj[key],
            configJson[key].mdtype.keys.map((s) => {
              return (r: any) => {
                return _.get(r, s) ? _.get(r, s) : ''
              }
            }),
          )
        }
      } else if (!Array.isArray(obj[key]) && typeof obj[key] === 'object') {
        obj[key] = _.chain(obj[key]).toPairs().sortBy(0).fromPairs().value()
      }
      deepSort(obj[key], configJson)
    }
  } else if (Array.isArray(obj)) {
    for (let index = 0; index < obj.length; index++) {
      if (!Array.isArray(obj[index]) && typeof obj[index] === 'object') {
        obj[index] = _.chain(obj[index]).toPairs().sortBy(0).fromPairs().value()
      }
      deepSort(obj[index], configJson)
    }
  }
}

export async function doReadSortWrite(files: string[], level: number) {
  return Promise.all(
    files.map((file, index) => {
      startTimer(
        ['file:', file, 'index:', index.toString().padStart(3), 'reading'],
        level,
        2,
      )
      return fsp
        .readFile(file, {flag: 'r', encoding: 'utf8'})
        .then((data) => {
          endTimer(
            ['file:', file, 'index:', index.toString().padStart(3), 'reading'],
            level,
            2,
          )
          startTimer(
            [
              'file:',
              file,
              'index:',
              index.toString().padStart(3),
              'parsing xml',
            ],
            level,
            2,
          )
          const xmljsResult = xmljs.xml2js(data, optXml2js)
          endTimer(
            [
              'file:',
              file,
              'index:',
              index.toString().padStart(3),
              'parsing xml',
            ],
            level,
            2,
          )
          startTimer(
            [
              'file:',
              file,
              'index:',
              index.toString().padStart(3),
              'sorting object',
            ],
            level,
            2,
          )
          const match = data.match(regGenericMatch)
          let meta
          if (match !== null) {
            meta = match[0]
          }
          if (!getSupportedMeta().includes(meta)) {
            throw constants.ERR_META_NOT_SUPPORT
          }
          deepSort(xmljsResult, getMetaConfig(meta))
          endTimer(
            [
              'file:',
              file,
              'index:',
              index.toString().padStart(3),
              'sorting object',
            ],
            level,
            2,
          )
          return xmljsResult
        })
        .then((data) => {
          startTimer(constants.steps.writeFile, level, 1)
          fsp.writeFile(file, xmljs.js2xml(data, optJs2xml).concat('\n'), {
            encoding: 'utf8',
          })
          endTimer(constants.steps.writeFile, level, 1)
        })
    }),
  )
}

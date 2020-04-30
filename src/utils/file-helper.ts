import * as fs from 'fs'
import * as xmljs from 'xml-js'
import {startTimer, endTimer} from '../utils/verbose-helper'
import {constants} from '../utils/constants'
import * as _ from 'lodash'
import {getSupportedMeta, getMetaConfig} from '../utils/generic-meta-node'

const fsp = fs.promises
const regGenericMatch = /(?<=<)(\w+)(?= +xmlns)/
const optXml2js = {compact: true, textKey: '_', attributesKey: '$'}
const optJs2xml = {compact: true, textKey: '_', attributesKey: '$', spaces: 4}
const finalKeys = ['$', '_', '_comment']

export async function writeOutput(file, jsonOutput) {
  if (file !== undefined && file !== '') {
    fsp.writeFile(file, xmljs.js2xml(jsonOutput, optJs2xml).concat('\n'), {
      encoding: 'utf8',
    })
  } else {
    console.log('joined:', JSON.stringify(jsonOutput))
  }
}

function sorter(s) {
  return (r: any) => {
    return _.get(r, s, '')
  }
}

function sortObj(o: object): object {
  return _.chain(o).toPairs().sortBy(0).fromPairs().value()
}

export function deepSort(obj, configJson) {
  if (typeof obj === 'object') {
    for (const key of _.keys(obj).sort()) {
      if (finalKeys.includes(key)) continue
      if (configJson[key] && configJson[key].mdtype.keys) {
        if (configJson[key].isArray) {
          // eslint-disable-next-line max-depth
          if (!Array.isArray(obj[key])) obj[key] = [obj[key]]
          obj[key] = _.sortBy(
            obj[key],
            configJson[key].mdtype.keys.map((s) => sorter(s)),
          )
        } else {
          obj[key] = sortObj(obj[key])
        }
        deepSort(obj[key], configJson)
      } else {
        if (!Array.isArray(obj[key]) && typeof obj[key] === 'object')
          obj[key] = sortObj(obj[key])
        deepSort(obj[key], configJson)
      }
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
        .finally(() => {
          endTimer(
            ['file:', file, 'index:', index.toString().padStart(3), 'reading'],
            level,
            2,
          )
        })
        .then((data) => {
          startTimer(
            [
              'file:',
              file,
              'index:',
              index.toString().padStart(3),
              'getting metaType',
            ],
            level,
            2,
          )
          const match = data.match(regGenericMatch)
          let meta
          if (match !== null) {
            meta = match[0]
          }
          if (meta !== undefined && !getSupportedMeta().includes(meta)) {
            throw constants.ERR_META_NOT_SUPPORT
          }
          endTimer(
            [
              'file:',
              file,
              'index:',
              index.toString().padStart(3),
              'getting metaType',
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

export async function getFiles(files: string[], level: number) {
  return Promise.all(
    files.map((file, index) => {
      startTimer(
        ['file:', file, 'index:', index.toString().padStart(3), 'reading'],
        level,
        2,
      )
      return fsp
        .readFile(file, {flag: 'r', encoding: 'utf8'})
        .finally(() => {
          endTimer(
            ['file:', file, 'index:', index.toString().padStart(3), 'reading'],
            level,
            2,
          )
        })
        .catch((error) => {
          throw error
        })
    }),
  )
}

export async function getAndCheckMetadataType(files: string[], _level: number) {
  return Promise.all(
    files.map((file, _index) => {
      const match = file.match(regGenericMatch)
      let meta: string
      if (match !== null) {
        meta = match[0]
      }
      if (meta !== undefined && !getSupportedMeta().includes(meta)) {
        throw constants.ERR_META_NOT_SUPPORT
      }
      return meta
    }),
  ).then((data) => {
    data = data.filter((el, i, a) => el !== undefined && i === a.indexOf(el))
    if (data.length > 1) {
      throw constants.ERR_META_MULTI
    }
    return data[0]
  })
}

async function promXml2Js(file) {
  return new Promise((resolve) => {
    resolve(xmljs.xml2js(file, optXml2js))
  })
}

export async function getParsedFiles(files: string[], _level: number) {
  return Promise.all(
    files.map((file, _index) => {
      return promXml2Js(file)
    }),
  )
}

function deepKeyForJoin(obj: any, configJson: object): void {
  if (!(typeof obj === 'object')) return
  for (const key of _.keys(obj)) {
    if (finalKeys.includes(key)) continue
    if (configJson[key] && configJson[key].mdtype.keys) {
      if (configJson[key].isArray) {
        // eslint-disable-next-line max-depth
        if (!Array.isArray(obj[key])) obj[key] = [obj[key]]
        obj[key] = _.keyBy(obj[key], (o) => {
          if (configJson[key].mdtype.exclusiveKeys) {
            return _.get(
              o,
              _.find(configJson[key].mdtype.exclusiveKeys, (k) => _.has(o, k)),
            )
          }
          if (configJson[key].mdtype.keys) {
            return configJson[key].mdtype.keys.map((s) => _.get(o, s))
          }
        })
        // eslint-disable-next-line max-depth
        for (const elem of _.values(obj[key])) {
          deepKeyForJoin(elem, configJson)
        }
      } else {
        deepKeyForJoin(obj[key], configJson)
      }
    } else if (!_.has(obj[key], '_') && !_.has(obj[key], '_comment')) {
      if (!configJson[key]) {
        console.error(constants.ERR_UNLISTED_META_NODE.message, key)
        // console.dir(obj[key], {depth: null})
      }
      deepKeyForJoin(obj[key], configJson)
    }
  }
}

export async function getKeyedForJoin(
  files: object[],
  configJson: object,
  meta: string,
) {
  return Promise.all(
    files.map((file: object, _index) => {
      deepKeyForJoin(file[meta], configJson)
      return file
    }),
  )
}

export function joinFiles(sources: object[], reverse: boolean): void {
  if (reverse) {
    return _.defaultsDeep({}, ..._.reverse(sources))
  }
  return _.defaultsDeep({}, ...sources)
}

export function unkeyFiles(obj: any, configJson: object): void {
  if (typeof obj === 'object') {
    for (const key of _.keys(obj)) {
      if (finalKeys.includes(key)) continue
      if (configJson[key] && configJson[key].isArray) {
        obj[key] = Object.values(obj[key])
        unkeyFiles(obj[key], configJson)
      } else {
        unkeyFiles(obj[key], configJson)
      }
    }
  }
}

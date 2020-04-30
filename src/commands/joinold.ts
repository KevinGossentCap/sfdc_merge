import {Command, flags} from '@oclif/command'
import {
  getMetadataType,
  getMetaConfigJSON,
  getKeyedFiles,
  writeOutputBased,
  allFilesExist,
} from '../utils/file-helper'
import {addVerboseInfo, startTimer, endTimer} from '../utils/verbose-helper'
import {JSONPath} from 'jsonpath-plus'
import {constants} from '../utils/constants'

export default class JoinOld extends Command {
  static description = 'Additionally merge the files of same metadataType'

  static flags = {
    help: flags.help({char: 'h'}),
    meta: flags.string({
      char: 'm',
      description: 'path(s) to file(s) to join',
      multiple: true,
      required: true,
    }),
    output: flags.string({
      char: 'o',
      description: 'path to write output',
    }),
    verbose: flags.boolean({
      char: 'v',
      description: 'verbose mode',
    }),
    loglevel: flags.integer({
      char: 'l',
      description: 'level of verbose details',
      default: 0,
    }),
    algo: flags.string({
      char: 'a',
      description: 'algorithm for join, latest or meld',
      default: 'latest',
      options: ['latest', 'meld'],
    }),
  }

  async run() {
    const {flags} = this.parse(JoinOld)
    startTimer(constants.steps.global, flags.verbose)

    startTimer(constants.steps.inputs, flags.verbose)
    if (flags.verbose && !flags.loglevel) flags.loglevel = 1
    await allFilesExist(flags.meta).catch(() => {
      console.error(constants.ERR_META_NOT_REACHABLE.message)
      endTimer(constants.steps.global, flags.verbose)
      throw constants.ERR_META_NOT_REACHABLE
    })
    endTimer(constants.steps.inputs, flags.verbose)

    startTimer(constants.steps.join.getMeta, flags.verbose)
    let meta
    await getMetadataType(flags.meta)
      .then((result) => {
        meta = result
        addVerboseInfo(flags.verbose, 'meta to join:', meta)
      })
      .catch((error) => {
        console.error(error.message)
        endTimer(constants.steps.global, flags.verbose)
        throw error
      })
    endTimer(constants.steps.join.getMeta, flags.verbose)

    startTimer(constants.steps.join.getConf, flags.verbose)
    let configJson
    await getMetaConfigJSON(meta)
      .then((result) => {
        configJson = result
      })
      .catch(() => {
        console.error(constants.ERR_META_NOT_SUPPORT.message, meta)
        endTimer(constants.steps.global, flags.verbose)
        throw constants.ERR_META_NOT_SUPPORT
      })
    endTimer(constants.steps.join.getConf, flags.verbose)

    startTimer(constants.steps.join.getFiles, flags.verbose)
    let fileKeyedJSON
    await getKeyedFiles(flags.meta, meta, configJson, flags.loglevel)
      .then((result) => {
        fileKeyedJSON = result
      })
      .catch((error) => {
        console.error(error)
        throw error
      })
    endTimer(constants.steps.join.getFiles, flags.verbose)

    startTimer(constants.steps.join.joinFiles, flags.verbose)
    const reducerKeyedLatest = function (acc, curr) {
      // first loop we will use the current Permission => no merge required :D
      if (Object.entries(acc).length === 0 && acc.constructor === Object) {
        return curr
      }
      Object.assign(acc, curr)
      return acc
    }
    const reducerKeyedmeld = function (acc, curr) {
      // first loop we will use the current Permission => no merge required :D
      if (Object.entries(acc).length === 0 && acc.constructor === Array) {
        return curr
      }
      // eslint-disable-next-line new-cap
      const jspath = JSONPath({
        path: '$..[?(@.subKeys)]',
        json: configJson,
        resultType: 'parentProperty',
        wrap: false,
      })
      if (jspath) {
        Object.keys(curr).forEach((p) => {
          if (
            acc[p] &&
            configJson[curr[p].nodeType] &&
            jspath.includes(curr[p].nodeType)
          ) {
            // make sure we aggregate only the subKeys elements, the rest remains only curr
            configJson[curr[p].nodeType].subKeys.forEach((att) => {
              if (acc[p].node[att]) {
                let accArray = []
                if (Array.isArray(acc[p].node[att])) {
                  accArray = acc[p].node[att]
                } else if (acc[p].node[att] !== undefined) {
                  accArray = [acc[p].node[att]]
                }
                let currArray = []
                if (Array.isArray(curr[p].node[att])) {
                  currArray = curr[p].node[att]
                } else if (curr[p].node[att] !== undefined) {
                  currArray = [curr[p].node[att]]
                }
                const mapper = function (acc, curr) {
                  if (typeof curr === 'string') {
                    acc[curr] = curr
                  } else {
                    acc[curr._] = curr
                  }
                  return acc
                }
                accArray = accArray.reduce(mapper, [])
                currArray = currArray.reduce(mapper, [])
                Object.assign(accArray, currArray)
                const result = []
                for (const val of Object.values(accArray)) result.push(val)
                curr[p].node[att] = result
              }
            })
            Object.assign(acc[p], curr[p])
          } else {
            acc[p] = curr[p]
          }
        })
      } else {
        Object.assign(acc, curr)
      }
      return acc
    }
    let mergedKeyed
    if (flags.algo === 'latest') {
      mergedKeyed = fileKeyedJSON.reduce(reducerKeyedLatest, {})
    } else {
      mergedKeyed = fileKeyedJSON.reduce(reducerKeyedmeld, [])
    }
    endTimer(constants.steps.join.joinFiles, flags.verbose)

    startTimer(constants.steps.join.unKeyFile, flags.verbose)
    const unKeyed = {}
    Object.keys(mergedKeyed)
      .sort()
      .forEach(function (key) {
        // eslint-disable-next-line no-negated-condition
        if (mergedKeyed[key].nodeType !== '$') {
          if (!Array.isArray(unKeyed[mergedKeyed[key].nodeType])) {
            unKeyed[mergedKeyed[key].nodeType] = []
          }
          unKeyed[mergedKeyed[key].nodeType].push(mergedKeyed[key].node)
        } else {
          unKeyed[mergedKeyed[key].nodeType] = mergedKeyed[key].node
        }
      })
    endTimer(constants.steps.join.unKeyFile, flags.verbose)

    startTimer(constants.steps.writeFile, flags.verbose)
    await writeOutputBased(meta, flags.output, unKeyed)
    endTimer(constants.steps.writeFile, flags.verbose)

    endTimer(constants.steps.global, flags.verbose)
    console.log('sfdx-md-merge-driver:', constants.success.join)
  }
}

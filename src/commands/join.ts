import {Command, flags} from '@oclif/command'
import {
  getMetadataType,
  getMetaConfigJSON,
  getKeyedFiles,
  writeOutput,
  allFilesExist,
} from '../utils/file-helper'
import {addVerboseInfo, startTimer, endTimer} from '../utils/verbose-helper'
import {JSONPath} from 'jsonpath-plus'

export default class Join extends Command {
  static description = 'Additionally merge the files of same metadataType'

  static flags = {
    help: flags.help({char: 'h'}),
    meta: flags.string({
      char: 'm',
      description: 'path(s) to file(s) to join',
      multiple: true,
    }),
    output: flags.string({
      char: 'o',
      description: 'path to write output',
    }),
    verbose: flags.boolean({
      char: 'v',
      description: 'verbose mode',
    }),
    algo: flags.string({
      char: 'a',
      description: 'algorithm for join, latest or meld',
      default: 'latest',
      options: ['latest', 'meld'],
    }),
  }

  async run() {
    const {flags} = this.parse(Join)
    startTimer(flags.verbose, 'teatment time')

    startTimer(flags.verbose, 'input check time')
    if (flags.meta === undefined) {
      console.error('list of permissions to merge is empty')
      endTimer(flags.verbose, 'teatment time')
      return ''
    }
    await allFilesExist(flags.meta).catch(() => {
      console.error('at least a metadataFile is not accessible')
      endTimer(flags.verbose, 'teatment time')
      throw new Error('at least a metadataFile is not accessible')
    })
    endTimer(flags.verbose, 'input check time')

    startTimer(flags.verbose, 'get metadaType time')
    let meta
    await getMetadataType(flags.meta)
      .then((result) => {
        meta = result
        addVerboseInfo(flags.verbose, 'meta to join:', meta)
      })
      .catch((error) => {
        console.error(error)
        endTimer(flags.verbose, 'teatment time')
        throw new Error(error)
      })
    endTimer(flags.verbose, 'get metadaType time')

    startTimer(flags.verbose, 'get config time')
    let configJson
    await getMetaConfigJSON(meta)
      .then((result) => {
        configJson = result
      })
      .catch((error) => {
        console.error(error)
        throw error
      })
    endTimer(flags.verbose, 'get config time')

    startTimer(flags.verbose, 'get keyed files time')
    let fileKeyedJSON
    await getKeyedFiles(flags.meta, meta, configJson, flags.verbose).then(
      (result) => {
        fileKeyedJSON = result
      },
    )
    endTimer(flags.verbose, 'get keyed files time')

    startTimer(flags.verbose, 'join keyed time')
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
      if (Object.entries(acc).length === 0 && acc.constructor === Object) {
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
    endTimer(flags.verbose, 'join keyed time')

    startTimer(flags.verbose, 'transform keyed to unkeyed')
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
    endTimer(flags.verbose, 'transform keyed to unkeyed')

    startTimer(flags.verbose, 'writing keyed time')
    await writeOutput(meta, flags.output, unKeyed)
    endTimer(flags.verbose, 'writing keyed time')

    endTimer(flags.verbose, 'teatment time')
    console.log('sfdx-md-merge-driver:', 'successfully joined.')
  }
}

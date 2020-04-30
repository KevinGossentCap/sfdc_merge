import {Command, flags} from '@oclif/command'
import {
  getFiles,
  getAndCheckMetadataType,
  getParsedFiles,
  getKeyedForJoin,
  joinFiles,
  unkeyFiles,
  deepSort,
  writeOutput,
} from '../utils/file-helper'
import {addVerboseInfo, startTimer, endTimer} from '../utils/verbose-helper'
import {constants} from '../utils/constants'
import {getMetaConfig} from '../utils/generic-meta-node'

export default class Join extends Command {
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
    const {flags} = this.parse(Join)
    startTimer(constants.steps.global, flags.verbose)

    startTimer(constants.steps.join.getFiles, flags.verbose)
    // get files and error if unreachable
    let tabFiles: Array<any>
    await getFiles(flags.meta, flags.loglevel)
      .then((data) => {
        tabFiles = data
      })
      .finally(() => {
        endTimer(constants.steps.join.getFiles, flags.verbose)
      })
      .catch((error) => {
        if (error.code === 'ENOENT') {
          error = constants.ERR_META_NOT_REACHABLE
        }
        console.error(error.message)
        endTimer(constants.steps.global, flags.verbose)
        throw error
      })
    // console.dir(tabFiles, {depth: null})

    // get metadataType and error if unsupported or not only 1
    startTimer(constants.steps.join.getMeta, flags.verbose)
    let meta: string
    await getAndCheckMetadataType(tabFiles, flags.loglevel)
      .then((data) => {
        meta = data
        addVerboseInfo(flags.verbose, 'meta to join:', meta)
      })
      .finally(() => {
        endTimer(constants.steps.join.getMeta, flags.verbose)
      })
      .catch((error) => {
        console.error(error.message)
        endTimer(constants.steps.global, flags.verbose)
        throw error
      })

    // getting related config fir metatada
    startTimer(constants.steps.join.getConf, flags.verbose)
    const configMeta = getMetaConfig(meta)
    endTimer(constants.steps.join.getConf, flags.verbose)

    // parsing XML to js Object
    startTimer(constants.steps.join.parseFiles, flags.verbose)
    await getParsedFiles(tabFiles, flags.loglevel)
      .then((data) => {
        tabFiles = data
      })
      .finally(() => {
        endTimer(constants.steps.join.parseFiles, flags.verbose)
      })
    // .catch((error) => {
    //   console.error(error.message)
    //   endTimer(constants.steps.global, flags.verbose)
    //   throw error
    // })
    // console.dir(tabFiles, {depth: null})

    // ordering and keying
    startTimer(constants.steps.join.keyFiles, flags.verbose)
    await getKeyedForJoin(tabFiles, configMeta, meta)
      .then((data) => {
        tabFiles = data
      })
      .finally(() => {
        endTimer(constants.steps.join.keyFiles, flags.verbose)
      })
    // console.dir(tabFiles, {depth: null})

    // merging
    startTimer(constants.steps.join.joinFiles, flags.verbose)
    const merged = joinFiles(tabFiles, flags.algo === 'latest')
    // console.dir(merged, {depth: null})
    endTimer(constants.steps.join.joinFiles, flags.verbose)

    // unkeying
    startTimer(constants.steps.join.unKeyFile, flags.verbose)
    unkeyFiles(merged, configMeta)
    // console.dir(merged, {depth: null})
    endTimer(constants.steps.join.unKeyFile, flags.verbose)

    // resorting keys the right way
    startTimer(constants.steps.join.sortFile, flags.verbose)
    deepSort(merged, configMeta)
    endTimer(constants.steps.join.sortFile, flags.verbose)

    // writing merged file
    startTimer(constants.steps.writeFile, flags.verbose)
    await writeOutput(flags.output, merged)
    endTimer(constants.steps.writeFile, flags.verbose)

    endTimer(constants.steps.global, flags.verbose)
    console.log('sfdx-md-merge-driver:', constants.success.join)
  }
}

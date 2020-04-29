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

export default class Join2 extends Command {
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
    const {flags} = this.parse(Join2)
    startTimer(constants.steps.global, flags.verbose)

    startTimer(constants.steps.join.getFiles, flags.verbose)
    // get files and error if unreachable
    let tabFiles: Array<any>
    await getFiles(flags.meta, flags.loglevel)
      .catch((error) => {
        if (error.code === 'ENOENT') {
          endTimer(constants.steps.join.getFiles, flags.verbose)
          console.error(constants.ERR_META_NOT_REACHABLE.message)
          endTimer(constants.steps.global, flags.verbose)
          throw constants.ERR_META_NOT_REACHABLE
        }
        throw error
      })
      .then((data) => {
        tabFiles = data
      })
    endTimer(constants.steps.join.getFiles, flags.verbose)
    // console.dir(tabFiles, {depth: null})

    // get metadataType and error if unsupported or not only 1
    startTimer(constants.steps.join.getMeta, flags.verbose)
    let meta: string
    await getAndCheckMetadataType(tabFiles, flags.loglevel)
      .catch((error) => {
        endTimer(constants.steps.join.getMeta, flags.verbose)
        console.error(error.message)
        endTimer(constants.steps.global, flags.verbose)
        throw error
      })
      .then((data) => {
        meta = data
        addVerboseInfo(flags.verbose, 'meta to join:', meta)
      })
    endTimer(constants.steps.join.getMeta, flags.verbose)

    // getting related config fir metatada
    startTimer(constants.steps.join.getConf, flags.verbose)
    const configMeta = getMetaConfig(meta)
    endTimer(constants.steps.join.getConf, flags.verbose)

    // parsing XML to js Object
    startTimer(constants.steps.join.parseFiles, flags.verbose)
    await getParsedFiles(tabFiles, flags.loglevel)
      .catch((error) => {
        endTimer(constants.steps.join.parseFiles, flags.verbose)
        throw error
      })
      .then((data) => {
        tabFiles = data
      })
    // console.dir(tabFiles, {depth: null})
    endTimer(constants.steps.join.parseFiles, flags.verbose)

    // ordering and keying
    startTimer(constants.steps.join.keyFiles, flags.verbose)
    await getKeyedForJoin(tabFiles, configMeta).then((data) => {
      tabFiles = data
    })
    // console.dir(tabFiles, {depth: null})
    endTimer(constants.steps.join.keyFiles, flags.verbose)

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
    await writeOutput(meta, flags.output, merged)
    endTimer(constants.steps.writeFile, flags.verbose)

    endTimer(constants.steps.global, flags.verbose)
    console.log('sfdx-md-merge-driver:', constants.success.join)
  }
}

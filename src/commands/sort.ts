import {Command, flags} from '@oclif/command'
import {startTimer, endTimer} from '../utils/verbose-helper'
import {allFilesExist, doReadSortWrite} from '../utils/file-helper'
import {constants} from '../utils/constants'
import {configJson} from '../utils/generic-config'

export default class Sort extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    meta: flags.string({
      char: 'm',
      description: 'path(s) to file(s) to sort',
      multiple: true,
      required: true,
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
  }

  async run() {
    const {flags} = this.parse(Sort)
    startTimer(constants.steps.global, flags.verbose)

    startTimer(constants.steps.inputs, flags.verbose)
    if (flags.verbose && !flags.loglevel) flags.loglevel = 1
    await allFilesExist(flags.meta).catch(() => {
      console.error(constants.ERR_META_NOT_REACHABLE.message)
      endTimer(constants.steps.global, flags.verbose)
      throw constants.ERR_META_NOT_REACHABLE
    })
    endTimer(constants.steps.inputs, flags.verbose)

    // startTimer(constants.steps.join.getConf, flags.verbose)
    // let configJson
    // await getGenericConfigJSON().then((result) => {
    //   configJson = result
    // })
    // endTimer(constants.steps.join.getConf, flags.verbose)

    await doReadSortWrite(flags.meta, flags.loglevel, configJson)

    endTimer(constants.steps.global, flags.verbose)
    console.log('sfdx-md-merge-driver:', constants.success.sort)
  }
}

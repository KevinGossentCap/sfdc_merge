import {Command, flags} from '@oclif/command'
import {startTimer, endTimer} from '../utils/verbose-helper'
import {allFilesExist, doReadWrite} from '../utils/file-helper'
import {constants} from '../utils/constants'

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
    startTimer(flags.verbose, constants.steps.global)

    startTimer(flags.verbose, constants.steps.inputs)
    if (flags.verbose && !flags.loglevel) flags.loglevel = 1
    await allFilesExist(flags.meta).catch(() => {
      console.error(constants.ERR_META_NOT_REACHABLE.message)
      endTimer(flags.verbose, constants.steps.global)
      throw constants.ERR_META_NOT_REACHABLE
    })
    endTimer(flags.verbose, constants.steps.inputs)

    await doReadWrite(flags.meta, flags.loglevel)

    endTimer(flags.verbose, constants.steps.global)
    console.log('sfdx-md-merge-driver:', 'successfully sorted.')
  }
}

import {Command, flags} from '@oclif/command'
import {startTimer, endTimer} from '../utils/verbose-helper'
import {
  // allFilesExist,
  doReadSortWrite,
} from '../utils/file-helper'
import {constants} from '../utils/constants'
// import {configJson} from '../utils/generic-meta-node'

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

    await doReadSortWrite(flags.meta, flags.loglevel).catch((error) => {
      if (error.code === 'ENOENT') {
        error = constants.ERR_META_NOT_REACHABLE
      }
      console.error(error.message)
      endTimer(constants.steps.global, flags.verbose)
      throw error
    })

    endTimer(constants.steps.global, flags.verbose)
    console.log('sfdx-md-merge-driver:', constants.success.sort)
  }
}
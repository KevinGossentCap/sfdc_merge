import {Command, flags} from '@oclif/command'
import {startTimer, endTimer} from '../utils/verbose-helper'
import {allFilesExist, doReadWrite} from '../utils/file-helper'

export default class Sort extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    meta: flags.string({
      char: 'm',
      description: 'path(s) to file(s) to sort',
      multiple: true,
    }),
    verbose: flags.boolean({
      char: 'v',
      description: 'verbose mode',
    }),
  }

  async run() {
    const {flags} = this.parse(Sort)
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

    await doReadWrite(flags.meta, flags.verbose)

    endTimer(flags.verbose, 'teatment time')
    console.log('sfdx-md-merge-driver:', 'successfully sorted.')
  }
}

import {Command, Flags} from '@oclif/core'
import spawnSync from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

import {getRoot} from '../utils/driver-utils.js'

export default class Uninstall extends Command {
  static override description = 'Remove the previously configured driver'
  static override flags = {
    global: Flags.boolean({
      char: 'g',
      description: 'removes from your user-level git configuration',
    }),
    help: Flags.help({char: 'h'}),
    name: Flags.string({
      char: 'n',
      default: 'sfdx-md-merge-driver',
      description: 'String to use as the merge driver name in your configuration'
    })
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(Uninstall)
    const {env} = process
    const rootDir = getRoot()

    // we dont check isInstalled here as isInstalled returns true
    // for full installs only
    if (rootDir) {
      const opts = flags.global ? '--global' : '--local'
      // remove git config settings
      spawnSync.spawnSync(
        'git',
        ['config', opts, '--remove-section', 'merge.'+flags.name],
        {cwd: rootDir, env}
      )

      const attrFile = path.join(rootDir, '.git', 'info', 'attributes');

      // remove git attributes
      if (fs.existsSync(attrFile)) {
        let attrContents = '';


        let strRE = String.raw `.* merge\s*=\s*`
        strRE += flags.name + '$'
        const RE = new RegExp(strRE)
        try {
          attrContents = fs
            .readFileSync(attrFile, 'utf8')
            .split(/\r?\n/)
            .filter(line => !RE.test(line))
            .join('\n');
        } catch {
          // some issue we cannot handle
        }

        fs.writeFileSync(attrFile, attrContents);
      }
    }

    this.log('uninstalled successfully')
  }
}

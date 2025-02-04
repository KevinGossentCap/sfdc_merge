import {Command, Flags} from '@oclif/core'
import spawnSync from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

import {getRoot} from '../utils/driver-utils.js'
import Uninstall from './uninstall.js'

const defaultFiles:string[] = [
  // '*.profile',
  // '*.profile-meta.xml',
  // '*.permissionset',
  // '*.permissionset-meta.xml',
  '*.labels',
  '*.labels-meta.xml',
]

export default class Install extends Command {
  static override description = 'Set up the merge driver in the current git repository'
  static override flags = {
    driver: Flags.string({
      char: 'd',
      default: 'npx --legacy-peer-deps @kgossent/sfdx-md-merge-driver merge -o %O -a %A -b %B -p %P',
      deprecated: true,
      description: 'string to install as the driver in the git configuration',
    }),
    files: Flags.string({
      char: 't',
      default: defaultFiles,
      description: 'Filenames that will trigger this driver.',
      multiple: true,
      options: [
        '*.profile',
        '*.profile-meta.xml',
        '*.permissionset',
        '*.permissionset-meta.xml',
        '*.labels',
        '*.labels-meta.xml',
      ],
    }),
    global: Flags.boolean({
      char: 'g',
      description: 'install to your user-level git configuration',
    }),
    help: Flags.help({char: 'h'}),
    name: Flags.string({
      char: 'n',
      default: 'sfdx-md-merge-driver',
      description:
        'String to use as the merge driver name in your configuration.',
    }),
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(Install)
    const {env} = process
    const rootDir = getRoot()

    if (!rootDir) {
      throw new Error('Current working directory is not using git or git is not installed, skipping install.')
    }


    if (this.areEqual(flags.files, defaultFiles)) {
      const uninstallOptions = ['--name', flags.name]
      if (flags.global) {uninstallOptions.push('--global')}
      const uninst = new Uninstall(uninstallOptions, this.config)
      await uninst.run()
    }

    const infoDir = path.join(rootDir, '.git', 'info')
    if (!fs.existsSync(infoDir)) {
      fs.mkdirSync(infoDir)
    }

    // add to git config
    const opts = flags.global ? '--global' : '--local'
    const configOne = spawnSync.spawnSync(
      'git',
      ['config', opts, 'merge.'+flags.name+'.name', 'automatically merge npm lockfiles'],
      {cwd: rootDir, env}
    )
    const configTwo = spawnSync.spawnSync(
      'git',
      ['config', opts, 'merge.'+flags.name+'.driver', flags.driver],
      {cwd: rootDir, env}
    )
    if (configOne.status !== 0 || configTwo.status !== 0) {
      throw new Error('Failed to configure '+flags.name+' in git directory')
    }

    // add to attributes file
    const attrFile = path.join(infoDir, 'attributes')
    let attrContents = ''
    if (fs.existsSync(attrFile)) {
      attrContents = fs.readFileSync(attrFile, 'utf8').trim()
    }

    if (attrContents && !/[\n\r]$/g.test(attrContents)) {
      attrContents += '\n'
    }

    for (const element of flags.files) {
      attrContents += element+' merge='+flags.name+'\n'
    }

    fs.writeFileSync(attrFile, attrContents)

    this.log('installed successfully')
  }

  private areEqual(array1:string[], array2:string[]) {
    if (array1.length === array2.length) {
      return array1.every(element => array2.includes(element))
    }

    return false
  }
}

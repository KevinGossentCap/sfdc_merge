 import {runCommand} from '@oclif/test'
import {expect} from 'chai'
import spawnSync from 'node:child_process'

// import {getRoot} from '../../src/utils/driver-utils.js'

describe('merge', () => {
  afterEach(() => {
    // const rootDir = getRoot()
    spawnSync.spawnSync(
      'git',
      ['checkout', '-q', '--', 'test/files/*'],
      // {cwd: rootDir, process.env}
    )
    // shell.exec('git checkout -q -- test/files/*')
  })

  it('runs merge expect 2 Conflicts', async () => {
    const {stderr} = await runCommand([
      'merge',
      '-o', './test/files/ancestor.profile-meta.xml',
      '-a', './test/files/ours.profile-meta.xml',
      '-b', './test/files/theirs.profile-meta.xml',
      '-p', './test/files/ancestor.profile-meta.xml',
    ])
    expect(stderr).to.contain('Conflicts Found: 2')
  })

  it('runs merge (w/o ancestor)', async () => {
    const {stderr} = await runCommand([
      'merge',
      '-o', 'no_file',
      '-a', './test/files/ours.profile-meta.xml',
      '-b', './test/files/theirs.profile-meta.xml',
      '-p', './test/files/ancestor.profile-meta.xml',
    ])
    expect(stderr).to.contain('successfully merged')
  })

  it('runs merge (w/o theirs)', async () => {
    const {stderr} = await runCommand([
      'merge',
      '-o', './test/files/ancestor.profile-meta.xml',
      '-a', './test/files/ours.profile-meta.xml',
      '-b', 'no_file',
      '-p', './test/files/ancestor.profile-meta.xml',
    ])
    expect(stderr).to.contain('Conflicts Found: 2')
  })

  it('runs merge big files', async () => {
    const {stderr} = await runCommand([
      'merge',
      '-o', './test/files/WZ_Admin.profile',
      '-a', './test/files/WZ_Admin.profile',
      '-b', './test/files/WZ_Admin.profile',
      '-p', './test/files/WZ_Admin.profile',
    ])
    expect(stderr).to.contain('WZ_Admin')
  })
})

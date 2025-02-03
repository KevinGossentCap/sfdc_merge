import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('init', () => {
  it('runs init', async () => {
    const {stdout} = await runCommand('')
    expect(stdout).to.contain('sfdx-md-merge-driver')
  })
})

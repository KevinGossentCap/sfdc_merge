import {expect, test} from '@oclif/test'

describe('sfdx-md-merge-driver:install', () => {
  test
    .stdout()
    .command(['sfdx-md-merge-driver:install'])
    .it('runs install', ctx => {
      expect(ctx.stdout).to.contain('')
    })
})

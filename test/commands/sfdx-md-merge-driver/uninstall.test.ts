import {expect, test} from '@oclif/test'

describe('sfdx-md-merge-driver:uninstall', () => {
  test
    .stdout()
    .command(['sfdx-md-merge-driver:uninstall'])
    .it('runs uninstall', ctx => {
      expect(ctx.stdout).to.contain('')
    })
})

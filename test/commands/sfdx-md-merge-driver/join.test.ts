import {expect, test} from '@oclif/test'

describe('sfdx-md-merge-driver:join', () => {
  test
    .stdout()
    .command(['sfdx-md-merge-driver:join'])
    .it('runs join', ctx => {
      expect(ctx.stdout).to.contain('')
    })
})

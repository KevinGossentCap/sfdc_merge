/* eslint-disable unicorn/no-process-exit */
/* eslint-disable no-process-exit */
import {expect, test} from '@oclif/test'
import {constants} from '../../src/utils/constants'

describe('sort', () => {
  test
    .stub(process, 'exit', () => 'foobar')
    .stderr()
    .command(['sort'])
    .catch((error) => {
      expect(error.message)
        .to.contain('Missing required flag:')
        .to.contain('-m, --meta META')
        .to.contain('path(s) to file(s) to sort')
    })
    .it('runs sort with no file', (_ctx) => {
      expect(process.exit()).to.equal('foobar')
    })

  test
    .stub(process, 'exit', () => 'foobar')
    .stderr()
    .command(['sort', '-m', './test/files/non_existing.profile-meta.xml'])
    .catch((error) => {
      expect(error.message).to.equal(constants.ERR_META_NOT_REACHABLE.message)
    })
    .it('runs sort with inexisting file', (_ctx) => {
      expect(process.exit()).to.equal('foobar')
    })

  test
    .stub(process, 'exit', () => 'foobar')
    .stdout()
    .command(['sort', '-m', './test/files/package1.xml', '-v'])
    .it('runs sort verbose', (ctx) => {
      expect(process.exit()).to.equal('foobar')
      expect(ctx.stdout)
        .to.contain(constants.steps.global)
        .to.contain(constants.success.sort)
    })

  test
    .stub(process, 'exit', () => 'foobar')
    .stdout()
    .command(['sort', '-m', './test/files/package1.xml', '-v', '-l', '2'])
    .it('runs sort loglevel 2', (ctx) => {
      expect(process.exit()).to.equal('foobar')
      expect(ctx.stdout)
        .to.contain(constants.steps.global)
        .to.contain(constants.success.sort)
    })
})

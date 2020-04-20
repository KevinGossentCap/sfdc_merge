/* eslint-disable unicorn/no-process-exit */
/* eslint-disable no-process-exit */
import {expect, test} from '@oclif/test'

describe('sort', () => {
  test
    .stub(process, 'exit', () => 'foobar')
    .stdout()
    .command(['sort', '-m', './test/files/package1.xml', '-v'])
    .it('runs sort verbose', (ctx) => {
      expect(process.exit()).to.equal('foobar')
      expect(ctx.stdout).to.contain('teatment time')
      expect(ctx.stdout).to.contain('successfully sorted')
    })

  test
    .stub(process, 'exit', () => 'foobar')
    .stderr()
    .command(['sort'])
    .it('runs sort with no file', (ctx) => {
      expect(process.exit()).to.equal('foobar')
      expect(ctx.stderr).to.contain('list of permissions to merge is empty')
    })

  test
    .stub(process, 'exit', () => 'foobar')
    .stderr()
    .command(['sort', '-m', './test/files/non_existing.profile-meta.xml'])
    .catch((error) => {
      expect(error.message).to.equal(
        'at least a metadataFile is not accessible',
      )
    })
    .it('runs sort with inexisting file', (ctx) => {
      expect(process.exit()).to.equal('foobar')
      expect(ctx.stderr).to.contain('at least a metadataFile is not accessible')
    })
})

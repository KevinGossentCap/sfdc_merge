/* eslint-disable unicorn/no-process-exit, no-process-exit */
import {expect, test} from '@oclif/test'
import {constants} from '../../src/utils/constants'
const strJoin =
  '{"_declaration":{"$":{"version":"1.0","encoding":"UTF-8"}},"Profile":{"$":{"xmlns":"http://soap.sforce.com/2006/04/metadata"},"layoutAssignments":[{"layout":{"_":"Account-Account Layout"}},{"layout":{"_":"Account-Account Layout"},"recordType":{"_":"Account.Customer"}}],"userPermissions":[{"enabled":{"_":"false"},"name":{"_":"ViewSetup"}}]}}'

describe('join', () => {
  test
    .stub(process, 'exit', () => 'foobar')
    .stderr()
    .command(['join'])
    .catch((error) => {
      expect(error.message)
        .to.contain('Missing required flag:')
        .to.contain('-m, --meta META')
        .to.contain('path(s) to file(s) to join')
    })
    .it('runs join with no file', (_ctx) => {
      expect(process.exit()).to.equal('foobar')
    })

  test
    .stub(process, 'exit', () => 'foobar')
    .stderr()
    .command(['join', '-m', './test/files/non_existing.profile-meta.xml'])
    .catch((error) => {
      expect(error.message).to.equal(constants.ERR_META_NOT_REACHABLE.message)
    })
    .it('runs join with inexisting file', (_ctx) => {
      expect(process.exit()).to.equal('foobar')
    })

  test
    .stub(process, 'exit', () => 'foobar')
    .stderr()
    .command(['join', '-m', './test/files/test.inexistantmeta'])
    .catch((error) => {
      expect(error.message).to.equal(constants.ERR_META_NOT_SUPPORT.message)
    })
    .it('runs join unsupported metadata type', (_ctx) => {
      expect(process.exit()).to.equal('foobar')
    })

  test
    .stub(process, 'exit', () => 'foobar')
    .stderr()
    .command([
      'join',
      '-m',
      './test/files/ancestor.profile-meta.xml',
      '-m',
      './test/files/package1.xml',
    ])
    .catch((error) => {
      expect(error.message).to.equal(constants.ERR_META_MULTI.message)
    })
    .it('runs join multiple different metadataTypes', (_ctx) => {
      expect(process.exit()).to.equal('foobar')
    })

  test
    .stub(process, 'exit', () => 'foobar')
    .stdout()
    .command([
      'join',
      '-m',
      './test/files/ancestor.profile-meta.xml',
      '-m',
      './test/files/ours.profile-meta.xml',
      '-m',
      './test/files/theirs.profile-meta.xml',
    ])
    .it('runs join', (ctx) => {
      expect(process.exit()).to.equal('foobar')
      expect(ctx.stdout).to.contain(strJoin).to.contain(constants.success.join)
    })

  test
    .stub(process, 'exit', () => 'foobar')
    .stdout()
    .command([
      'join',
      '-m',
      './test/files/ancestor.profile-meta.xml',
      '-m',
      './test/files/empty.profile',
    ])
    .it('runs join with one empty', (ctx) => {
      expect(process.exit()).to.equal('foobar')
      expect(ctx.stdout).to.contain(constants.success.join)
    })

  test
    .stub(process, 'exit', () => 'foobar')
    .stdout()
    .command([
      'join',
      '-m',
      './test/files/package1.xml',
      '-o',
      './test/files/package3.xml',
      '-v',
    ])
    .it('runs join verbose', (ctx) => {
      expect(process.exit()).to.equal('foobar')
      expect(ctx.stdout).to.contain(constants.steps.global)
    })

  test
    .stub(process, 'exit', () => 'foobar')
    .stdout()
    .command([
      'join',
      '-m',
      './test/files/package1.xml',
      '-o',
      './test/files/package3.xml',
      '-v',
      '-l',
      '2',
    ])
    .it('runs join loglevel 2', (ctx) => {
      expect(process.exit()).to.equal('foobar')
      expect(ctx.stdout).to.contain(constants.steps.global)
    })

  test
    .stub(process, 'exit', () => 'foobar')
    .stdout()
    .command([
      'join',
      '-a',
      'meld',
      '-m',
      './test/files/package1.xml',
      '-m',
      './test/files/package2.xml',
    ])
    .it('runs join meld', (ctx) => {
      expect(process.exit()).to.equal('foobar')
      expect(ctx.stdout).to.contain(constants.success.join)
    })

  test
    .stub(process, 'exit', () => 'foobar')
    .stdout()
    .command([
      'join',
      '-a',
      'meld',
      '-m',
      './test/files/Case-fr.objectTranslation',
      '-m',
      './test/files/Case-fr.objectTranslation',
    ])
    .it('runs join variant unique key', (ctx) => {
      expect(process.exit()).to.equal('foobar')
      expect(ctx.stdout).to.contain(constants.success.join)
    })

  test
    .stub(process, 'exit', () => 'foobar')
    .stdout()
    .command([
      'join',
      '-m',
      './test/files/WZ_Admin.profile',
      '-m',
      './test/files/WZ_Admin.profile',
      '-m',
      './test/files/WZ_Admin.profile',
      '-o',
      './test/files/WZ_Admin.profile',
    ])
    .it('runs join with big file', (ctx) => {
      expect(process.exit()).to.equal('foobar')
      expect(ctx.stdout).to.contain(constants.success.join)
    })
})

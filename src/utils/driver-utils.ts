import spawnSync from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

export function noop() {}
export function getRoot() {
    const {env} = process;
    const cwd = process.cwd();
    const gitRootResult = spawnSync.spawnSync('git', ['rev-parse', '--show-toplevel'], {cwd, env});
    const rootDir = gitRootResult.stdout ? gitRootResult.stdout.toString().trim() : '';
    return gitRootResult.status !== 0 || !rootDir || !fs.existsSync(path.join(rootDir, '.git')) ? '' : rootDir;
}
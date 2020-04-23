export function addVerboseInfo(verbose: boolean, ...args): void {
  if (verbose) console.log(...args)
}

// verbose: boolean, strStep: string
// level: number, expected: number, strStep: string
export function startTimer(
  strStep: string | Array<string>,
  verbose: boolean,
): void
export function startTimer(
  strStep: string | Array<string>,
  verbose: number,
  expected: number,
): void
export function startTimer(
  strStep?: string | Array<string>,
  verbose?: boolean | number,
  expected?: number,
): void {
  if (Array.isArray(strStep)) {
    strStep = strStep.join(' ')
  }
  if ((typeof verbose === 'boolean' && verbose) || verbose >= expected) {
    console.time(strStep)
  }
}

// verbose: boolean, strStep: string
// level: number, expected: number, strStep: string
export function endTimer(
  strStep: string | Array<string>,
  verbose: boolean,
): void
export function endTimer(
  strStep: string | Array<string>,
  verbose: number,
  expected: number,
): void
export function endTimer(
  strStep?: string | Array<string>,
  verbose?: boolean | number,
  expected?: number,
): void {
  if (Array.isArray(strStep)) {
    strStep = strStep.join(' ')
  }
  if ((typeof verbose === 'boolean' && verbose) || verbose >= expected) {
    console.timeEnd(strStep)
  }
}

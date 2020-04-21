export function addVerboseInfo(verbose: boolean, ...args): void {
  if (verbose) console.log(...args)
}

// verbose: boolean, strStep: string
// level: number, expected: number, strStep: string
export function startTimer(...args) {
  switch (args.length) {
    case 2:
      if (args[0]) console.time(args[1])
      break
    case 3:
      if (args[0] >= args[1]) console.time(args[2])
      break
  }
}

// verbose: boolean, strStep: string
// level: number, expected: number, strStep: string
export function endTimer(...args) {
  switch (args.length) {
    case 2:
      if (args[0]) console.timeEnd(args[1])
      break
    case 3:
      if (args[0] >= args[1]) console.timeEnd(args[2])
      break
  }
}

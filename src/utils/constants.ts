export const constants = Object.freeze({
  ERR_META_NOT_REACHABLE: new Error(
    'at least a metadataFile is not accessible',
  ),
  ERR_META_NOT_SUPPORT: new Error('unsupported metadata Type'),
  ERR_META_MULTI: new Error('multiple metadataTypes given as input'),
  steps: {
    global: 'teatment time',
    inputs: 'input check time',
    writeFile: 'write file time',
    join: {
      getMeta: 'get metadaType time',
      getConf: 'get config time',
      getFiles: 'get files time',
      parseFiles: 'parse files time',
      keyFiles: 'keying files time',
      joinFiles: 'join keyed time',
      unKeyFile: 'transform keyed to unkeyed',
      sortFile: 'sorting file',
    },
  },
  success: {
    join: 'successfully joined',
    sort: 'successfully sorted',
  },
})

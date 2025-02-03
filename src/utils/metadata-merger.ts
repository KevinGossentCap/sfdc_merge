#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-explicit-any */

// import {AnyJson, JsonMap, Nullable} from '@salesforce/ts-types'
import fs from 'node:fs'
import path from 'node:path'
import * as xml2js from 'xml2js'

export default class MetadataMerger {
  public config
  public metadataType: string

  constructor(O: any, A: any, B: any) {
    this.metadataType = this.getMetadataType(O, A, B)
    // console.log('using config ' + this.getConfigPath())
    this.config = JSON.parse(fs.readFileSync(this.getConfigPath(), 'utf8'))
  }

  areNodesEqual(node1: any, node2: any, localpart: any) {
    const nodeTypeConfig = this.config[localpart]
    // eslint-disable-next-line no-eq-null, eqeqeq
    if (node2 == null || node2.node == null) {
      return [false, [null]]
    }

    if (nodeTypeConfig &&
        Array.isArray(nodeTypeConfig.equalKeys) &&
        // eslint-disable-next-line unicorn/explicit-length-check
        nodeTypeConfig.equalKeys.length
      ) {
        const list = []
        for (const key of nodeTypeConfig.equalKeys) {
          if (node1[key] && node2.node && node2.node[key] &&

              node1[key][0] &&
              node2.node[key][0] &&
              node1[key][0] !== node2.node[key][0]
            ) {
              list.push({key, value: node2.node[key][0]})
            }
        }

        // eslint-disable-next-line unicorn/explicit-length-check
        if (Array.isArray(list) && list.length) {
          return [false, list]
        }

        return [true, []]
      }

    return node1 === node2.node ? [true, []] : [false, node2.node];
  }

  buildUniqueKey(node: any, localpart: any) {
    let uniqueKey: any = null
    const nodeTypeConfig = this.config[localpart]
    if (nodeTypeConfig) {
      uniqueKey = localpart + '#'
      if (nodeTypeConfig.uniqueKeys) {
        for (const key of nodeTypeConfig.uniqueKeys) {
          if (node[key]) {
            uniqueKey += node[key][0] + '#'
          }
        }
      } else {
        let exclusiveUniqueKey = ''
        if (Array.isArray(nodeTypeConfig.exclusiveUniqueKeys)) {
          for (const euk of nodeTypeConfig.exclusiveUniqueKeys) {
            // eslint-disable-next-line max-depth
            if (node[euk] &&
              node[euk][0]) {
                exclusiveUniqueKey = exclusiveUniqueKey + node[euk][0] + '#'
              }

            // eslint-disable-next-line max-depth
            if (exclusiveUniqueKey !== '') {
              break
            }
          }

          uniqueKey += exclusiveUniqueKey
        }
      }
    }

    return uniqueKey
  }

  buildUniqueKeyCount(node: any, localpart: any, count: any) {
    let uniqueKey = this.buildUniqueKey(node, localpart)
    // eslint-disable-next-line no-eq-null, eqeqeq
    if (uniqueKey == null) {
      uniqueKey = localpart + `#${count}#`
    }

    return uniqueKey
  }

  getBaseNodes() {
    return this.parseStringSync(this.getNodeBaseXML())
  }

  getConfigPath() {
    return path.join(
      // __dirname,
      '..',
      '..',
      '/conf/merge-' + this.metadataType.toLowerCase() + '-config.json',
    )
  }

  getMetadataType(path1: any, path2: any, path3: any): string {
    let tmpFile = ''
    tmpFile = fs.existsSync(path1) ? fs.readFileSync(path1, 'utf8') : ''
    if (tmpFile.length === 0) {
      tmpFile = fs.existsSync(path2) ? fs.readFileSync(path2, 'utf8') : ''
    }

    if (tmpFile.length === 0) {
      tmpFile = fs.existsSync(path3) ? fs.readFileSync(path3, 'utf8') : ''
    }

    let lineToRead = 0
    const lines = tmpFile.split(/[\n\r]/)
    while (!lines[lineToRead].includes('xmlns')) {
      lineToRead += 1
    }

    switch (true) {
      case /.*profile.*/.test(lines[lineToRead].toLowerCase()): {
        return 'Profile'
      }

      case /.*permissionset.*/.test(lines[lineToRead].toLowerCase()): {
        return 'PermissionSet'
      }

      case /.*customlabels.*/.test(lines[lineToRead].toLowerCase()): {
        return 'CustomLabels'
      }

      default: {
        console.error('Bad input, this metadata type not handled')
        return ''
      }
    }
  }

  getNodeBaseXML() {
    switch (this.metadataType) {
      case 'CustomLabels': {
        return '<?xml version="1.0" encoding="UTF-8"?><CustomLabels xmlns="http://soap.sforce.com/2006/04/metadata"></CustomLabels>'
      }

      case 'PermissionSet': {
        return '<?xml version="1.0" encoding="UTF-8"?><PermissionSet xmlns="http://soap.sforce.com/2006/04/metadata"></PermissionSet>'
      }

      case 'Profile': {
        return '<?xml version="1.0" encoding="UTF-8"?><Profile xmlns="http://soap.sforce.com/2006/04/metadata"></Profile>'
      }

      default: {
        return ''
      }
    }
  }

  getNodes(file: string):any {
    let tmpFile:string = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : ''
    if (tmpFile.length === 0) {
      tmpFile = this.getNodeBaseXML()
    }

    return this.parseStringSync(tmpFile)[this.metadataType]
  }

  parseStringSync(str: any):any {
    let result = {}
    new xml2js.Parser().parseString(str, (e, r) => {
      result = r
    })
    return result
  }
}

/* eslint-disable complexity */
/* eslint-disable max-depth */
import {Command, Flags} from '@oclif/core'
import * as fs from 'node:fs'
import * as xml2js from 'xml2js'

import MetadataMerger from '../utils/metadata-merger.js'

const builder = new xml2js.Builder({
  renderOpts: {indent: '    ', newline: '\n', pretty: true},
  xmldec: {encoding: 'utf8', version: '1.0'},
  // xmlns: true,
})
type StringArrayStringIndexed = {
  [index: string]: string
}
type StringArrayOfNodes = {
  [index: number|string]: string|{
    existsInAncient?: boolean,
    isEqualsToAncient?: boolean,
    isEqualsToAncientFailedList?: boolean,
    node:StringArrayOfNodes,
    nodeType:string,
  }
}

export default class Merge extends Command {
  static description = 'Check for conflicts and merge them if possible.'
  static flags = {
    ancestor: Flags.string({
      char: 'o',
      description: 'ancestor’s version',
      required: true,
    }),
    current: Flags.string({
      char: 'a',
      description: 'current version',
      required: true,
    }),
    help: Flags.help({char: 'h'}),
    other: Flags.string({
      char: 'b',
      description: 'other branches’ version',
      required: true,
    }),
    output: Flags.string({
      char: 'p',
      description: 'pathname in which the merged result will be stored',
    }),
  }

  async run() {
    const {flags} = await this.parse(Merge)
    const args:StringArrayStringIndexed = {}
    if (flags.ancestor) {
      args['%O'] = flags.ancestor
    }

    if (flags.current) {
      args['%A'] = flags.current
    }

    if (flags.other) {
      args['%B'] = flags.other
    }

    if (flags.output) {
      args['%P'] = flags.output
    }

    const md = new (MetadataMerger)(
      args['%O'],
      args['%A'],
      args['%B'],
    )
    if (md !== null && md !== undefined) {
      const base = md.getBaseNodes()
      const ancientNodes = md.getNodes(args['%O']) // ancestor’s version of the conflicting file
      const oursNodes = md.getNodes(args['%A']) // current version of the conflicting file
      const theirsNodes = md.getNodes(args['%B']) // other branch's version of the conflicting file

      console.error('sfdx-md-merge-driver: merging', args['%P'])

      const ancient:StringArrayOfNodes = {}
      if (ancientNodes !== null && typeof ancientNodes === 'object'){
        for (const localpart of Object.keys(ancientNodes)) {
          let nodelist = ancientNodes[localpart]
          if (!Array.isArray(nodelist)) {
            nodelist = [nodelist]
          }

          for (const node of nodelist) {
            const uniqueNodeKey: string = md.buildUniqueKey(node, localpart)
            if (uniqueNodeKey) {
              ancient[uniqueNodeKey] = {
                node,
                nodeType: localpart,
              }
            }
          }
        }
      }

      const ours:StringArrayOfNodes = {}
      let oursIds: string[] = []
      let unmatchedNodeCount = 0
      for (const localpart of Object.keys(oursNodes)) {
        let nodelist = oursNodes[localpart]
        if (!Array.isArray(nodelist)) {
          nodelist = [nodelist]
        }

        for (const node of nodelist) {
          const uniqueNodeKey = md.buildUniqueKeyCount(
            node,
            localpart,
            unmatchedNodeCount++,
          )
          oursIds.push(uniqueNodeKey)
          ours[uniqueNodeKey] = {
            // eslint-disable-next-line no-eq-null, eqeqeq
            existsInAncient: ancient[uniqueNodeKey] != null,
            isEqualsToAncient: md.areNodesEqual(
              node,
              ancient[uniqueNodeKey],
              localpart,
            )[0],
            isEqualsToAncientFailedList: md.areNodesEqual(
              node,
              ancient[uniqueNodeKey],
              localpart,
            )[1],
            node,
            nodeType: localpart,
          }
        }
      }

      let conflictCounter = 0
      for (const localpart of Object.keys(theirsNodes)) {
        let nodelist = theirsNodes[localpart]
        if (!Array.isArray(nodelist)) {
          nodelist = [nodelist]
        }

        for (const node of nodelist) {
          const uniqueNodeKey = md.buildUniqueKey(node, localpart)
          if (uniqueNodeKey) {
            // eslint-disable-next-line no-eq-null, eqeqeq
            const existsInAncient = ancient[uniqueNodeKey] != null
            const isEqualsToAncient = md.areNodesEqual(
              node,
              ancient[uniqueNodeKey],
              localpart,
            )[0]
            let existsInOurs /* = oursIds.filter(function(value, index, arr) {
              return value !== uniqueNodeKey
            }) */
            if (oursIds.includes(uniqueNodeKey)) {
              existsInOurs = true
              // oursIds = oursIds.filter(function(value, index, arr) {
              oursIds = oursIds.filter((value) => value !== uniqueNodeKey)
            } else {
              existsInOurs = false
            }

            const isEqualsToOurs = md.areNodesEqual(
              node,
              ours[uniqueNodeKey],
              localpart,
            )[0]
            const isEqualsToOursFailedList = md.areNodesEqual(
              node,
              ours[uniqueNodeKey],
              localpart,
            )[1]
            if (
              (!existsInAncient && existsInOurs && isEqualsToOurs) ||
              (existsInAncient &&
                ((existsInOurs && (isEqualsToOurs || isEqualsToAncient)) ||
                  (!existsInOurs && isEqualsToAncient)))
            ) {
              // Keep OURS
              // do nothing
            } else if (
              existsInAncient &&
              existsInOurs && typeof ours[uniqueNodeKey] === 'object' &&
              ours[uniqueNodeKey].isEqualsToAncient
            ) {
              // existed before, not modified in ours, use theirs (incomming)
              // Use THEIRS
              ours[uniqueNodeKey].node = node
            } else if (!existsInAncient && !existsInOurs) {
              // Use THEIRS
              ours[uniqueNodeKey] = {
                node,
                nodeType: localpart,
              }
            } else {
              // CONFLICT detected

              for (const entry of isEqualsToOursFailedList) {
                // eslint-disable-next-line no-eq-null, eqeqeq
                if (entry == null) {
                  for (const nkey of Object.keys(node)) {
                    conflictCounter++
                    node[nkey][0] =
                      '\n<<<<<<< CURRENT\n=======\n' +
                      node[nkey][0] +
                      '\n>>>>>>> OTHER\n'
                  }
                } else {
                  conflictCounter++
                  node[entry.key][0] =
                    '\n<<<<<<< CURRENT\n' +
                    entry.value +
                    '\n=======\n' +
                    node[entry.key][0] +
                    '\n>>>>>>> OTHER\n'
                }
              }

              if (existsInOurs && typeof ours[uniqueNodeKey] === 'object') {
                ours[uniqueNodeKey].node = node
              } else {
                ours[uniqueNodeKey] = {
                  node,
                  nodeType: localpart,
                }
              }
            }
          }
        }
      }

      for (const id of oursIds) {
          if (ours[id] && typeof ours[id] === 'object') {
            if (ours[id].existsInAncient && !ours[id].isEqualsToAncient) {
              // not exists in theirs branch, modified in ours
              if (typeof ours[id].node === 'object') {
                for (const nkey of Object.keys(ours[id].node)) {
                  conflictCounter++
                  ours[id].node[nkey] =
                    '\n<<<<<<< CURRENT\n' +
                    ours[id].node[nkey] +
                    '\n=======\n>>>>>>> OTHER\n'
                }
              }
            } else if (ours[id].isEqualsToAncient) {
              delete ours[id] // deleted in theirs branch, delete in ours
            }
          }
        } // all left oursIds see #59


      for (const key of Object.keys(ours)
        .sort()) {
          if (typeof base[md.metadataType] === 'object' && typeof ours[key] === 'object' && ours[key].nodeType === '$') {
            base[md.metadataType][ours[key].nodeType] = ours[key].node
          } else if (typeof ours[key] === 'object') {
            if (!Array.isArray(base[md.metadataType][ours[key].nodeType])) {
              base[md.metadataType][ours[key].nodeType] = []
            }

            base[md.metadataType][ours[key].nodeType].push(ours[key].node)
          }
        }

      fs.writeFileSync(
        args['%A'],
        builder
          .buildObject(base)
          .split('&lt;&lt;&lt;&lt;&lt;&lt;&lt;')
          .join('<<<<<<<')
          .split('&gt;&gt;&gt;&gt;&gt;&gt;&gt;')
          .join('>>>>>>>'),
      )

      if (conflictCounter > 0) {
        console.error('Conflicts Found: ' + conflictCounter)
        throw conflictCounter
      } else {
        console.error('sfdx-md-merge-driver:', args['%P'], 'successfully merged.')
      }
    }
  }
}

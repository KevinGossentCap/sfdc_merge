@kgossent/sfdx-md-merge-driver
=================

git merge driver specific for Salesforce.com Metadata


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@kgossent/sfdx-md-merge-driver.svg)](https://npmjs.org/package/@kgossent/sfdx-md-merge-driver)
[![Downloads/week](https://img.shields.io/npm/dw/@kgossent/sfdx-md-merge-driver.svg)](https://npmjs.org/package/@kgossent/sfdx-md-merge-driver)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @kgossent/sfdx-md-merge-driver
$ sfdx-md-merge-driver COMMAND
running command...
$ sfdx-md-merge-driver (--version)
@kgossent/sfdx-md-merge-driver/1.0.0-alpha.5 win32-x64 node-v22.13.1
$ sfdx-md-merge-driver --help [COMMAND]
USAGE
  $ sfdx-md-merge-driver COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`sfdx-md-merge-driver install`](#sfdx-md-merge-driver-install)
* [`sfdx-md-merge-driver merge`](#sfdx-md-merge-driver-merge)
* [`sfdx-md-merge-driver uninstall`](#sfdx-md-merge-driver-uninstall)

## `sfdx-md-merge-driver install`

Set up the merge driver in the current git repository

```
USAGE
  $ sfdx-md-merge-driver install [-d <value>] [-t *.labels|*.labels-meta.xml...] [-g] [-h] [-n <value>]

FLAGS
  -d, --driver=<value>     [default: npx @kgossent/sfdx-md-merge-driver merge -o %O -a %A -b %B -p %P] string to install
                           as the driver in the git configuration
  -g, --global             install to your user-level git configuration
  -h, --help               Show CLI help.
  -n, --name=<value>       [default: sfdx-md-merge-driver] String to use as the merge driver name in your configuration.
  -t, --files=<option>...  [default: *.labels,*.labels-meta.xml] Filenames that will trigger this driver.
                           <options: *.labels|*.labels-meta.xml>

DESCRIPTION
  Set up the merge driver in the current git repository
```

_See code: [src/commands/install.ts](https://github.com/KevinGossentCap/sfdc_merge/blob/v1.0.0-alpha.5/src/commands/install.ts)_

## `sfdx-md-merge-driver merge`

Check for conflicts and merge them if possible.

```
USAGE
  $ sfdx-md-merge-driver merge -o <value> -a <value> -b <value> [-h] [-p <value>]

FLAGS
  -a, --current=<value>   (required) current version
  -b, --other=<value>     (required) other branches’ version
  -h, --help              Show CLI help.
  -o, --ancestor=<value>  (required) ancestor’s version
  -p, --output=<value>    pathname in which the merged result will be stored

DESCRIPTION
  Check for conflicts and merge them if possible.
```

_See code: [src/commands/merge.ts](https://github.com/KevinGossentCap/sfdc_merge/blob/v1.0.0-alpha.5/src/commands/merge.ts)_

## `sfdx-md-merge-driver uninstall`

Remove the previously configured driver

```
USAGE
  $ sfdx-md-merge-driver uninstall [-g] [-h] [-n <value>]

FLAGS
  -g, --global        removes from your user-level git configuration
  -h, --help          Show CLI help.
  -n, --name=<value>  [default: sfdx-md-merge-driver] String to use as the merge driver name in your configuration

DESCRIPTION
  Remove the previously configured driver
```

_See code: [src/commands/uninstall.ts](https://github.com/KevinGossentCap/sfdc_merge/blob/v1.0.0-alpha.5/src/commands/uninstall.ts)_
<!-- commandsstop -->

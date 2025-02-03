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
@kgossent/sfdx-md-merge-driver/1.0.0-alpha.1 win32-x64 node-v22.13.1
$ sfdx-md-merge-driver --help [COMMAND]
USAGE
  $ sfdx-md-merge-driver COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`sfdx-md-merge-driver help [COMMAND]`](#sfdx-md-merge-driver-help-command)
* [`sfdx-md-merge-driver install`](#sfdx-md-merge-driver-install)
* [`sfdx-md-merge-driver merge`](#sfdx-md-merge-driver-merge)
* [`sfdx-md-merge-driver plugins`](#sfdx-md-merge-driver-plugins)
* [`sfdx-md-merge-driver plugins add PLUGIN`](#sfdx-md-merge-driver-plugins-add-plugin)
* [`sfdx-md-merge-driver plugins:inspect PLUGIN...`](#sfdx-md-merge-driver-pluginsinspect-plugin)
* [`sfdx-md-merge-driver plugins install PLUGIN`](#sfdx-md-merge-driver-plugins-install-plugin)
* [`sfdx-md-merge-driver plugins link PATH`](#sfdx-md-merge-driver-plugins-link-path)
* [`sfdx-md-merge-driver plugins remove [PLUGIN]`](#sfdx-md-merge-driver-plugins-remove-plugin)
* [`sfdx-md-merge-driver plugins reset`](#sfdx-md-merge-driver-plugins-reset)
* [`sfdx-md-merge-driver plugins uninstall [PLUGIN]`](#sfdx-md-merge-driver-plugins-uninstall-plugin)
* [`sfdx-md-merge-driver plugins unlink [PLUGIN]`](#sfdx-md-merge-driver-plugins-unlink-plugin)
* [`sfdx-md-merge-driver plugins update`](#sfdx-md-merge-driver-plugins-update)
* [`sfdx-md-merge-driver uninstall`](#sfdx-md-merge-driver-uninstall)

## `sfdx-md-merge-driver help [COMMAND]`

Display help for sfdx-md-merge-driver.

```
USAGE
  $ sfdx-md-merge-driver help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for sfdx-md-merge-driver.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.23/src/commands/help.ts)_

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

_See code: [src/commands/install.ts](https://github.com/KevinGossentCap/sfdc_merge/blob/v1.0.0-alpha.1/src/commands/install.ts)_

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

_See code: [src/commands/merge.ts](https://github.com/KevinGossentCap/sfdc_merge/blob/v1.0.0-alpha.1/src/commands/merge.ts)_

## `sfdx-md-merge-driver plugins`

List installed plugins.

```
USAGE
  $ sfdx-md-merge-driver plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ sfdx-md-merge-driver plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.28/src/commands/plugins/index.ts)_

## `sfdx-md-merge-driver plugins add PLUGIN`

Installs a plugin into sfdx-md-merge-driver.

```
USAGE
  $ sfdx-md-merge-driver plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into sfdx-md-merge-driver.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the SFDX_MD_MERGE_DRIVER_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the SFDX_MD_MERGE_DRIVER_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ sfdx-md-merge-driver plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ sfdx-md-merge-driver plugins add myplugin

  Install a plugin from a github url.

    $ sfdx-md-merge-driver plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ sfdx-md-merge-driver plugins add someuser/someplugin
```

## `sfdx-md-merge-driver plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ sfdx-md-merge-driver plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ sfdx-md-merge-driver plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.28/src/commands/plugins/inspect.ts)_

## `sfdx-md-merge-driver plugins install PLUGIN`

Installs a plugin into sfdx-md-merge-driver.

```
USAGE
  $ sfdx-md-merge-driver plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into sfdx-md-merge-driver.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the SFDX_MD_MERGE_DRIVER_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the SFDX_MD_MERGE_DRIVER_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ sfdx-md-merge-driver plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ sfdx-md-merge-driver plugins install myplugin

  Install a plugin from a github url.

    $ sfdx-md-merge-driver plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ sfdx-md-merge-driver plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.28/src/commands/plugins/install.ts)_

## `sfdx-md-merge-driver plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ sfdx-md-merge-driver plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ sfdx-md-merge-driver plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.28/src/commands/plugins/link.ts)_

## `sfdx-md-merge-driver plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ sfdx-md-merge-driver plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ sfdx-md-merge-driver plugins unlink
  $ sfdx-md-merge-driver plugins remove

EXAMPLES
  $ sfdx-md-merge-driver plugins remove myplugin
```

## `sfdx-md-merge-driver plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ sfdx-md-merge-driver plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.28/src/commands/plugins/reset.ts)_

## `sfdx-md-merge-driver plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ sfdx-md-merge-driver plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ sfdx-md-merge-driver plugins unlink
  $ sfdx-md-merge-driver plugins remove

EXAMPLES
  $ sfdx-md-merge-driver plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.28/src/commands/plugins/uninstall.ts)_

## `sfdx-md-merge-driver plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ sfdx-md-merge-driver plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ sfdx-md-merge-driver plugins unlink
  $ sfdx-md-merge-driver plugins remove

EXAMPLES
  $ sfdx-md-merge-driver plugins unlink myplugin
```

## `sfdx-md-merge-driver plugins update`

Update installed plugins.

```
USAGE
  $ sfdx-md-merge-driver plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.28/src/commands/plugins/update.ts)_

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

_See code: [src/commands/uninstall.ts](https://github.com/KevinGossentCap/sfdc_merge/blob/v1.0.0-alpha.1/src/commands/uninstall.ts)_
<!-- commandsstop -->

rsv
===

RocksDB simple viewer tool

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/rsv.svg)](https://npmjs.org/package/rsv)
[![Downloads/week](https://img.shields.io/npm/dw/rsv.svg)](https://npmjs.org/package/rsv)
[![License](https://img.shields.io/npm/l/rsv.svg)](https://github.com/shuse2/rsv/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g rsv
$ rsv COMMAND
running command...
$ rsv (-v|--version|version)
rsv/0.0.0 darwin-x64 node-v12.16.1
$ rsv --help [COMMAND]
USAGE
  $ rsv COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`rsv hello [FILE]`](#rsv-hello-file)
* [`rsv help [COMMAND]`](#rsv-help-command)

## `rsv hello [FILE]`

describe the command here

```
USAGE
  $ rsv hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ rsv hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/shuse2/rsv/blob/v0.0.0/src/commands/hello.ts)_

## `rsv help [COMMAND]`

display help for rsv

```
USAGE
  $ rsv help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.1.0/src/commands/help.ts)_
<!-- commandsstop -->

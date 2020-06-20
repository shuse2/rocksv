rocksv
===

RocksDB simple viewer tool

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/rocksv.svg)](https://npmjs.org/package/rocksv)
[![Downloads/week](https://img.shields.io/npm/dw/rocksv.svg)](https://npmjs.org/package/rocksv)
[![License](https://img.shields.io/npm/l/rocksv.svg)](https://github.com/shuse2/rocksv/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g rocksv
$ rocksv COMMAND
running command...
$ rocksv (-v|--version|version)
rocksv/0.1.1 darwin-x64 node-v12.16.1
$ rocksv --help [COMMAND]
USAGE
  $ rocksv COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`rocksv get DATAPATH KEY`](#rocksv-get-datapath-key)
* [`rocksv get-all DATAPATH`](#rocksv-get-all-datapath)
* [`rocksv help [COMMAND]`](#rocksv-help-command)

## `rocksv get DATAPATH KEY`

Get single value by key

```
USAGE
  $ rocksv get DATAPATH KEY

ARGUMENTS
  DATAPATH  Path to the RocksDB folder

  KEY       Key to get from the database. Custom replacer h{}, b{}, i{}, d{} from hex, base64, number, bigint to binary
            representation can be used. (For integer, it is big endian)

OPTIONS
  -f, --format=hex|base64|string  [default: hex] Format of value to display.
  -h, --help                      show CLI help

EXAMPLE
  rsc get dataPath searchingKey
```

_See code: [src/commands/get.ts](https://github.com/shuse2/rocksv/blob/v0.1.1/src/commands/get.ts)_

## `rocksv get-all DATAPATH`

Get rage of data

```
USAGE
  $ rocksv get-all DATAPATH

ARGUMENTS
  DATAPATH  Path to the RocksDB folder

OPTIONS
  -d, --delimiter=delimiter                   [default: :] Delimiter of the key

  -e, --end=end                               Key for the search to end with. Custom replacer h{}, b{}, i{}, d{} from
                                              hex, base64, number, bigint to binary representation can be used. (For
                                              integer, it is big endian)

  -f, --format=hex|base64|string              [default: hex] Format of value to display.

  -h, --help                                  show CLI help

  -l, --limit=limit                           Limit of the values to search

  -p, --prefix=prefix                         Prefix of keys to search

  -r, --reverse                               Show values in reverse order

  -s, --start=start                           Key for the search to start from. Custom replacer h{}, b{}, i{}, d{} from
                                              hex, base64, number, bigint to binary representation can be used. (For
                                              integer, it is big endian)

  --key-format=string|smart-hex|smart-base64  [default: smart-hex] Format of key to display. smart-hex and smart-base64
                                              will try to encode to hex or base64 with range of delimiter

EXAMPLE
  rsc get-all dataPath -l 100
```

_See code: [src/commands/get-all.ts](https://github.com/shuse2/rocksv/blob/v0.1.1/src/commands/get-all.ts)_

## `rocksv help [COMMAND]`

display help for rocksv

```
USAGE
  $ rocksv help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_
<!-- commandsstop -->

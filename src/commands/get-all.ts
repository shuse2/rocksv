import { Command, flags } from '@oclif/command';
import { getOpenDB, closeDB } from '../utils/db';
import { bufferToString, bufferToStringWithDelimiter, parseKey } from '../utils/format';

export default class GetAll extends Command {
  static description = 'Get rage of data';

  static examples = [
    'rsc get-all dataPath -l 100',
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
    start: flags.string({
      char: 's',
      description: 'Key for the search to start from. Custom replacer h{}, b{}, i{}, d{} from hex, base64, number, bigint to binary representation can be used. (For integer, it is big endian)',
    }),
    end: flags.string({
      char: 'e',
      description: 'Key for the search to end with. Custom replacer h{}, b{}, i{}, d{} from hex, base64, number, bigint to binary representation can be used. (For integer, it is big endian)',
    }),
    prefix: flags.string({
      char: 'p',
      description: 'Prefix of keys to search',
      exclusive: ['start', 'end'],
    }),
    reverse: flags.boolean({ char: 'r', description: 'Show values in reverse order' }),
    limit: flags.integer({ char: 'l', description: 'Limit of the values to search' }),
    delimiter: flags.string({ char: 'd', description: 'Delimiter of the key', default: ':' }),
    'key-format': flags.string({
      options: ['string', 'smart-hex', 'smart-base64'],
      default: 'smart-hex',
      description: 'Format of key to display. smart-hex and smart-base64 will try to encode to hex or base64 with range of delimiter',
    }),
    format: flags.string({
      char: 'f',
      options: ['hex', 'base64', 'string'],
      default: 'hex',
      description: 'Format of value to display.',
    }),
  };

  static args = [
    { name: 'dataPath', required: true, description: 'Path to the RocksDB folder' },
  ];

  async run() {
    const { args, flags } = this.parse(GetAll)
    const db = await getOpenDB(args.dataPath);
    const options: Record<string, unknown> = {};
    if (flags.start) {
      options.gte = `${parseKey(flags.start)}\x00`;
    }
    if (flags.end) {
      options.lte = `${parseKey(flags.end)}\xFF`;
    }
    if (flags.prefix) {
      options.gte = `${parseKey(flags.prefix)}\x00`;
      options.lte = `${parseKey(flags.prefix)}\xFF`;
    }
    if (flags.reverse) {
      options.reverse = flags.reverse;
    }
    if (flags.limit) {
      options.limit = flags.limit;
    }
    const stream = db.createReadStream(options);
    let counter = 0;
    try {
      await new Promise((resolve, reject) => {
        stream
          .on('data', ({ key, value }: { key: Buffer, value: Buffer }) => {
            counter += 1;
            this.log(`key: ${bufferToStringWithDelimiter(key, flags.delimiter, flags['key-format'])}, value: ${bufferToString(value, flags.format)}`)
          })
          .on('error', error => {
            reject(error);
          })
          .on('end', () => {
            this.log(`Total record: ${counter}`);
            resolve();
          });
      });
    } finally {
      await closeDB(db);
    }
  }
}

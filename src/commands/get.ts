import { Command, flags } from '@oclif/command';
import { getOpenDB, closeDB } from '../utils/db';
import { bufferToString, parseKey } from '../utils/format';

export default class Get extends Command {
  static description = 'Get single value by key';

  static examples = [
    'rsc get dataPath searchingKey',
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
    format: flags.string({
      char: 'f',
      options: ['hex', 'base64', 'string'],
      default: 'hex',
      description: 'Format of value to display.',
    }),
  };

  static args = [
    { name: 'dataPath', required: true, description: 'Path to the RocksDB folder' },
    {
      name: 'key',
      required: true,
      description: 'Key to get from the database. Custom replacer h{}, b{}, i{}, d{} from hex, base64, number, bigint to binary representation can be used. (For integer, it is big endian)',
    },
  ];

  async run() {
    const { args, flags } = this.parse(Get)
    const db = await getOpenDB(args.dataPath);
    let result: Buffer;
    try {
      result = await db.get(parseKey(args.key)) as Buffer;
    } catch(err) {
      if (err.notFound) {
        this.error(`Data with key ${args.key} was not found`);
      }
      this.error(err);
    } finally {
      await closeDB(db);
    }
    this.log(bufferToString(result, flags.format));
  }
}

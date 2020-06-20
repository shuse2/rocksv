import * as path from 'path';
import levelup, { LevelUp } from 'levelup';
import rocksdb from 'rocksdb';
import { CLIError } from '@oclif/errors';

export const getOpenDB = async (file: string): Promise<LevelUp<rocksdb>> =>
    new Promise((resolve, reject) => {
        const filePath = path.resolve(file);
        levelup(rocksdb(filePath), { readonly: true, createIfMissing: false }, ((err: Error, db: LevelUp<rocksdb>) => {
            if (err) {
                reject(new CLIError(`Failed to open database with path ${filePath}`));
                return;
            }
            resolve(db);
        }) as any);
    });

export const closeDB = async (db: LevelUp<rocksdb>): Promise<void> =>
    db.close()
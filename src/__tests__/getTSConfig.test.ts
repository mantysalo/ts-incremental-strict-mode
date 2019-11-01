import { getTSConfig } from '../cli';
import { resolve } from 'path';
import fs from 'fs';

describe('getTSConfig', () => {
    it('returns a config path', () => {
        expect(getTSConfig()).resolves.toMatch(resolve('./tsconfig.json'));
    });

    it('returns the specified path', () => {
        const fsSpy = jest.spyOn(fs, 'accessSync');
        fsSpy.mockImplementation(jest.fn());
        expect(getTSConfig('test/path')).resolves.toMatch('test/path');
    });

    it('throws an error if config path is invalid', async () => {
        try {
            await getTSConfig('./nosuchpath/tsconfig.json');
        } catch (error) {
            expect(error.code).toEqual('ENOENT');
            expect(error.message).toEqual(
                "ENOENT: no such file or directory, access './nosuchpath/tsconfig.json'"
            );
        }
    });
});

import { Config } from './Config';
import fs from 'fs';
import { resolve } from 'path';
import * as CLI from '../cli';

jest.mock('crypto', () => ({
    randomBytes: () => ''
}));

jest.mock('globby', () => (files: string[]) => files);

describe('createTempTSConfig', () => {
    it('creates a temporary tsconfig', async () => {
        const config = new Config();
        const writeFileSpy = jest.spyOn(fs, 'writeFile').mockImplementation(() => {});
        jest.spyOn(CLI, 'getAbsoluteFilePaths').mockImplementation((files: string[]) => files);
        const files = ['file1.ts', 'file2.ts'];
        const tsConfig = JSON.stringify({
            extends: resolve('tsconfig.json'),
            files,
            include: []
        });
        expect(await config.createTempTSConfig(files)).toBe('tsconfig.temp.json');
        expect(writeFileSpy).toHaveBeenCalledWith(
            'tsconfig.temp.json',
            tsConfig,
            expect.any(Function)
        );
    });
    it('creates a temporary tsconfig while extending an existing config', async () => {
        const config = new Config();
        const writeFileSpy = jest.spyOn(fs, 'writeFile').mockImplementation(() => {});
        jest.spyOn(CLI, 'getAbsoluteFilePaths').mockImplementation((files: string[]) => files);
        const files = ['file1.ts', 'file2.ts'];
        const tsConfig = JSON.stringify({
            extends: resolve('tsconfig.json'),
            files,
            include: []
        });
        jest.spyOn(fs, 'accessSync').mockImplementation(jest.fn());
        expect(await config.createTempTSConfig(files, 'hello')).toBe('./tsconfig.temp.json');
        expect(writeFileSpy).toHaveBeenCalledWith(
            'tsconfig.temp.json',
            tsConfig,
            expect.any(Function)
        );
    });
});

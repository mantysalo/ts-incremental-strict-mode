import { Config } from './Config';
import fs from 'fs';

describe('createTempTSConfig', () => {
    it('creates a temporary tsconfig', async () => {
        const config = new Config();
        jest.spyOn(fs, 'writeFile').mockImplementation(() => {});
        expect(await config.createTempTSConfig(['file1.ts', 'file2.ts'])).toContain(
            'tsconfig.temp.json'
        );
    });
});

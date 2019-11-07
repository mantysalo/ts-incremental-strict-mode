import { createTempTSConfig } from '../cli';
import fs from 'fs';
describe('createTempTSConfig', () => {
    it('creates a temporary tsconfig', async () => {
        jest.spyOn(fs, 'writeFile').mockImplementation(() => {});
        expect(await createTempTSConfig(['file1.ts', 'file2.ts'])).toContain('tsconfig.temp.json');
    });
});

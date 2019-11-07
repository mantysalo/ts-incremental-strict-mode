import { createTempTSConfig } from '../cli';

describe('createTempTSConfig', () => {
    it('creates a temporary tsconfig', async () => {
        expect(await createTempTSConfig(['file1.ts', 'file2.ts'])).toContain('tsconfig.temp.json');
    });
});

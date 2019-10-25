import { createTempTSConfig } from '../cli';

const regExForFilePath = /^\/([A-z0-9-_+]+\/)*(tsconfig+\.(json))$/gm;

describe('createTempTSConfig', () => {
    it('creates a temporary tsconfig', async () => {
        expect(await createTempTSConfig(['file1.ts', 'file2.ts'])).toMatch(regExForFilePath);
    });
});

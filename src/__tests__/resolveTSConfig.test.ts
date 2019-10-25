import { resolveTSConfig } from '../cli';

const regExForFilePath = /^\/([A-z0-9-_+]+\/)*(tsconfig+\.(json))$/gm;
describe('resolveTSConfig', () => {
    it('should resolve a tsconfig', async () => {
        const tsconfig = await resolveTSConfig();
        expect(tsconfig).toMatch(regExForFilePath);
    });
});

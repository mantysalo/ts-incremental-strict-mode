import { baseConfig } from '../baseConfig';

describe('baseConfig', () => {
    it('creates a valid tsconfig', () => {
        expect(baseConfig('./tsconfig.json', ['file1.ts'])).toEqual(
            '{"extends":"./tsconfig.json","include":["file1.ts"]}'
        );
    });
});

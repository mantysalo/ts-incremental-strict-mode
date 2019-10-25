import { generateTempConfig } from '../baseConfig';

describe('generateTempConfig', () => {
    it('creates a valid tsconfig', () => {
        expect(generateTempConfig('./tsconfig.json', ['file1.ts'])).toEqual(
            '{"extends":"./tsconfig.json","files":["file1.ts"]}'
        );
    });
});

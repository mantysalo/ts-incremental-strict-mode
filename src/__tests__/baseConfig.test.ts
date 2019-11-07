import { generateTempConfig } from '../baseConfig';
import fs from 'fs';

describe('generateTempConfig', () => {
    it('creates a valid tsconfig', () => {
        jest.spyOn(fs, 'writeFile').mockImplementation(() => {});
        expect(generateTempConfig('./tsconfig.json', ['file1.ts'])).toEqual(
            '{"extends":"./tsconfig.json","files":["file1.ts"],"include":[]}'
        );
    });
});

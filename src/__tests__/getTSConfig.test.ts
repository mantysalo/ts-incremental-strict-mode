import { getTSConfig } from '../cli';
import { resolve } from 'path';

describe('getTSConfig', () => {
    it('returns a config path', () => {
        expect(getTSConfig()).resolves.toMatch(resolve('./tsconfig.json'));
    });
});

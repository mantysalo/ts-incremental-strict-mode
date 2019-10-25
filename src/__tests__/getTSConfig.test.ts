import { getTSConfig } from '../cli';

jest.mock('fs');

describe('getTSConfig', () => {
    it('returns a config path', () => {
        expect(getTSConfig('./tsconfig.json')).resolves.toMatch('./tsconfig.json');
    });
});

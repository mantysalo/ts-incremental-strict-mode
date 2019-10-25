import { formatTypeScriptArgs } from '../formatTypeScriptArgs';

const args = {
    _: ['file1.ts', 'file2.ts'],
    verbose: false,
    $0: 'ts-incremental-strict-mode',
    noImplicitAny: true,
    noImplicitThis: true,
    alwaysStrict: true,
    strictBindCallApply: true,
    strictNullChecks: true,
    strictFunctionTypes: true,
    strictPropertyInitialization: true
};
describe('formatTypeScriptArgs', () => {
    it('should output valid typescript compiler arguments', () => {
        expect(formatTypeScriptArgs(args)).toMatchObject([
            '--noImplicitAny',
            'true',
            '--noImplicitThis',
            'true',
            '--alwaysStrict',
            'true',
            '--strictBindCallApply',
            'true',
            '--strictNullChecks',
            'true',
            '--strictFunctionTypes',
            'true',
            '--strictPropertyInitialization',
            'true'
        ]);
    });
});

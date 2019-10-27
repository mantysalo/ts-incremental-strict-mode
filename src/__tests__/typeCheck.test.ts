import { typeCheck } from '../cli';
import { resolve } from 'path';

// eslint-disable-next-line @typescript-eslint/unbound-method
const originalLog = console.log;
describe('typeCheck', () => {
    // Suppress console.logs from test output
    // eslint-disable-next-line @typescript-eslint/unbound-method
    beforeEach(() => (console.log = jest.fn()));

    // eslint-disable-next-line @typescript-eslint/unbound-method
    afterEach(() => (console.log = originalLog));

    it('type checks specified file', async () => {
        await typeCheck(['--strict'], ['src/__tests__/testfiles/test.ts'], false);
    });

    it('throws an error', async () => {
        await expect(
            typeCheck(['--strict'], ['src/__tests__/testfiles/noImplicitAny.ts'], false)
        ).rejects.toEqual(
            new Error(
                "src/__tests__/testfiles/noImplicitAny.ts(1,30): error TS7006: Parameter 'implicitAnyParameter' implicitly has an 'any' type."
            )
        );
    });

    it('console logs files to be typechecked in verbose mode', async () => {
        const consoleLogSpy = jest.spyOn(console, 'log');
        await typeCheck(['--strict'], ['src/__tests__/testfiles/test.ts'], true);
        // console.log for tsconfig path
        // console.log for 'Typechecking:'
        // console.log for test.ts path
        expect(consoleLogSpy).toBeCalledTimes(3);
    });

    it('type checks files specified with glob', async () => {
        const consoleLogs: string[] = [];
        const consoleLogSpy = jest.spyOn(console, 'log');
        consoleLogSpy.mockImplementation((input: string) => consoleLogs.push(input));

        const filesToCheck = [
            'src/__tests__/testfiles/glob/foo/test.ts',
            'src/__tests__/testfiles/glob/foo/bar/test.ts'
        ];
        const absolutePaths = filesToCheck.map(path => resolve(path));

        await typeCheck(
            ['--strict'],
            ['src/__tests__/testfiles/glob', '!src/__tests__/testfiles/glob/foo/bar/baz'],
            true
        );

        expect(consoleLogs).toContain(absolutePaths[0] && absolutePaths[1]);
    });
});

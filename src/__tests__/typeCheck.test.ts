import { typeCheck } from '../cli';

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
});

import * as CLI from '../cli';
import execa from 'execa';
jest.mock('execa');

// eslint-disable-next-line @typescript-eslint/unbound-method
const originalLog = console.log;
describe('typeCheck', () => {
    // Suppress console.logs from test output
    // eslint-disable-next-line @typescript-eslint/unbound-method
    beforeEach(() => (console.log = jest.fn()));

    // eslint-disable-next-line @typescript-eslint/unbound-method
    afterEach(() => (console.log = originalLog));
    const createTempTSConfigSpy = jest.spyOn(CLI, 'createTempTSConfig');
    createTempTSConfigSpy.mockImplementation(() => {
        console.log('using tsconfig from path');
        return Promise.resolve('test');
    });

    it('type checks specified file', async () => {
        // Required for this mock to work
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const execaMock: jest.Mock<typeof execa> = execa as any;
        await CLI.typeCheck(['--strict'], ['src/__tests__/testfiles/test.ts'], false);
        expect(execaMock).toBeCalledWith('tsc', ['--strict', '--noEmit', '--project', 'test'], {
            all: true
        });
    });

    it('console logs files to be typechecked in verbose mode', async () => {
        const consoleLogSpy = jest.spyOn(console, 'log');
        const getAbsoluteFilePathsSpy = jest.spyOn(CLI, 'getAbsoluteFilePaths');
        getAbsoluteFilePathsSpy.mockImplementation(() => ['testpath']);
        const consoleLogs: string[] = [];
        consoleLogSpy.mockImplementation(input => consoleLogs.push(input));
        await CLI.typeCheck(['--strict'], ['src/__tests__/testfiles/test.ts'], true);
        // 'using tsconfig from path','Typechecking:' and testpath from the mock
        expect(consoleLogSpy).toBeCalledTimes(3);
        expect(consoleLogs).toContain('testpath');
    });
});

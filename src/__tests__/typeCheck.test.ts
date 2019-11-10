import * as CLI from '../cli';
import execa from 'execa';
jest.mock('execa');
jest.mock('../Config/Config.ts', () => ({
    Config: class {
        public createTempTSConfig = async (): Promise<string> => {
            console.log('using tsconfig from path');
            return Promise.resolve('test');
        };
    }
}));
// eslint-disable-next-line @typescript-eslint/unbound-method
const originalLog = console.log;
describe('typeCheck', () => {
    // Suppress console.logs from test output
    // eslint-disable-next-line @typescript-eslint/unbound-method
    beforeEach(() => (console.log = jest.fn()));

    // eslint-disable-next-line @typescript-eslint/unbound-method
    afterEach(() => (console.log = originalLog));

    jest.spyOn(CLI, 'cleanUp').mockImplementation(jest.fn());
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
        const consoleLogs: string[] = [];
        const consoleLogSpy = jest
            .spyOn(console, 'log')
            .mockImplementation(input => consoleLogs.push(input));
        jest.spyOn(CLI, 'getAbsoluteFilePaths').mockImplementation(() => ['testpath']);
        await CLI.typeCheck(['--strict'], ['src/__tests__/testfiles/test.ts'], true);
        // 'using tsconfig from path','Typechecking:' and testpath from the mock
        expect(consoleLogSpy).toBeCalledTimes(3);
        expect(consoleLogs).toContain('testpath');
    });
});

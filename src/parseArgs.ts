import { TypeScriptOptions } from './formatTypeScriptArgs';
import yargs from 'yargs';
import chalk from 'chalk';
import { FilePath } from './cli';

export interface CLIOptions extends TypeScriptOptions {
    config?: FilePath;
    verbose: boolean;
    _: string[];
    $0: string;
}

export const parseArgs = (): CLIOptions => {
    const argv = yargs
        .strict()
        .scriptName('ts-incremental-strict-mode')
        .demandCommand(1, chalk.red('Specify at least one file to typecheck.'))
        .usage('Type check specified files with strict mode enabled.')
        .usage('Usage:')
        .usage('$0 [options] [files]')
        .example('$0 file.ts', 'Type check file.ts with strict mode enabled')
        .example(
            "$0 './src/**/*.{ts,tsx}'",
            'Type check every ts and tsx file inside src and subfolders with strict mode enabled'
        )
        .example(
            '$0 --noImplicitAny false file.ts',
            'Type check file.ts in strict mode with noImplicitAny disabled'
        )
        .example(
            '$0 --config ../../tsconfig.root.json file.ts',
            'Specify a path for a tsconfig to use'
        )
        .options({
            noImplicitAny: {
                type: 'boolean',
                describe: 'Raise error on expressions and declarations with an implied any type.',
                default: true
            },
            noImplicitThis: {
                type: 'boolean',
                describe: 'Raise error on this expressions with an implied any type.',
                default: true
            },
            alwaysStrict: {
                type: 'boolean',
                describe: 'Parse in strict mode and emit "use strict" for each source file',
                default: true
            },
            strictBindCallApply: {
                type: 'boolean',
                describe:
                    'Enable stricter checking of the bind, call, and apply methods on functions.',
                default: true
            },
            strictNullChecks: {
                type: 'boolean',
                describe:
                    'In strict null checking mode, the null and undefined values are not in the domain of every type and are only assignable to themselves and any (the one exception being that undefined is also assignable to void).',
                default: true
            },
            strictFunctionTypes: {
                type: 'boolean',
                describe: 'Disable bivariant parameter checking for function types.',
                default: true
            },
            strictPropertyInitialization: {
                type: 'boolean',
                describe:
                    'Ensure non-undefined class properties are initialized in the constructor. This option requires --strictNullChecks be enabled in order to take effect.',
                default: true
            },
            config: {
                type: 'string',
                describe:
                    'Path to your tsconfig file. If not specified, ts-incremental-strict-mode will try to resolve a tsconfig.json file in the directory you run ts-incremental-strict-mode. If not found it will move to the directory above until it finds a tsconfig.'
            },
            verbose: {
                type: 'boolean',
                describe:
                    'Output the files to be type checked in to console. Useful for testing glob patterns.',
                default: false
            }
        })
        .group(
            [
                'noImplicitAny',
                'noImplicitThis',
                'alwaysStrict',
                'strictBindCallApply',
                'strictNullChecks',
                'strictFunctionTypes',
                'strictPropertyInitialization'
            ],
            'TypeScript options:'
        )
        .group(['config', 'verbose'], 'ts-incremental-strict-mode options:')
        .showHelpOnFail(false, 'Run ts-incremental-strict-mode --help for available options')
        .parserConfiguration({
            'camel-case-expansion': false
        })
        .parse();
    return argv;
};

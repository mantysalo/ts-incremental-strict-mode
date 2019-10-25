import { CLIOptions } from './parseArgs';

export interface TypeScriptOptions {
    noImplicitAny: boolean;
    noImplicitThis: boolean;
    alwaysStrict: boolean;
    strictBindCallApply: boolean;
    strictNullChecks: boolean;
    strictFunctionTypes: boolean;
    strictPropertyInitialization: boolean;
}

function isBoolean(value: unknown): value is boolean {
    return typeof value === 'boolean';
}

export const formatTypeScriptArgs = (argv: CLIOptions): string[] => {
    const typeScriptOptions = Object.entries(argv)
        .filter(([key, value]) => isBoolean(value) && key !== 'verbose')
        .reduce<string[]>(
            (result, [key, value]: [string, boolean]) => [...result, `--${key}`, value.toString()],
            []
        );

    return typeScriptOptions;
};

import { FilePath } from './cli';

export const baseConfig = (existingConfigPath: FilePath, files: FilePath[]): string => {
    return JSON.stringify({
        extends: existingConfigPath,
        include: files
    });
};

import { FilePath } from './cli';

export const generateTempConfig = (existingConfigPath: FilePath, files: FilePath[]): string => {
    return JSON.stringify({
        extends: existingConfigPath,
        files,
        include: []
    });
};

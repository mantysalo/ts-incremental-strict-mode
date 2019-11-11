import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import { FilePath, getAbsoluteFilePaths } from '../cli';
import findUp = require('find-up');
import globby = require('globby');

export class Config {
    // Creates a temporary tsconfig which extends an existing configuration
    // but overrides the included files, to include only the files specified
    // via the CLI.
    public createTempTSConfig = async (
        files: FilePath[],
        configPath?: FilePath
    ): Promise<FilePath | undefined> => {
        const tempConfigFileName = crypto.randomBytes(8).toString('hex') + 'tsconfig.temp.json';
        const tempConfigFilePath = configPath
            ? `${path.posix.dirname(configPath)}/${tempConfigFileName}`
            : tempConfigFileName;
        const writeFileCallback = (error: NodeJS.ErrnoException | null): void => {
            if (error) {
                throw new Error('Failed to create a temporary tsconfig!');
            }
        };
        const tsConfigPath = await this.getTSConfig(configPath);
        console.log(`Using tsconfig from ${tsConfigPath}`);
        fs.writeFile(
            tempConfigFilePath,
            this.generateTempConfig(tsConfigPath, getAbsoluteFilePaths(await globby(files))),
            writeFileCallback
        );
        return tempConfigFilePath;
    };

    private resolveTSConfig = async (): Promise<string> => {
        const resolvedConfigPath = await findUp('tsconfig.json');
        if (resolvedConfigPath) {
            return resolvedConfigPath;
        } else {
            throw new Error('Could not find a tsconfig.json!');
        }
    };

    private getTSConfig = async (configPath?: FilePath): Promise<FilePath> => {
        if (configPath) {
            fs.accessSync(configPath);
            return path.resolve(configPath);
        } else {
            return await this.resolveTSConfig();
        }
    };

    private generateTempConfig = (existingConfigPath: FilePath, files: FilePath[]): string => {
        return JSON.stringify({
            extends: existingConfigPath,
            files,
            include: []
        });
    };
}

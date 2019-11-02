#!/usr/bin/env node
import { typeCheck } from './cli';
import { parseArgs } from './parseArgs';
import chalk from 'chalk';
import { formatTypeScriptArgs } from './formatTypeScriptArgs';

const argv = parseArgs();

const tscArgs = formatTypeScriptArgs(argv);

typeCheck(tscArgs, argv._, argv.verbose, argv.config)
    .then(() => console.log('ts-incremental-strict-mode:', chalk.bold.green('All files passed!')))
    .catch(error => console.log(chalk.bold.red(error.message)));

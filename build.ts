/* eslint-disable import/no-extraneous-dependencies */
import { exec } from 'child_process';
import fs from 'fs-extra';
import { promisify } from 'util';
import logger from './src/shared/utils/logger';

const execAsync = promisify(exec);

async function remove(path: string): Promise<void> {
  try {
    logger.info(`Removing "${path}"`);
    await fs.remove(path);
  } catch (err) {
    logger.error(`Error removing "${path}"`);
    throw err;
  }
}

async function copy(src: string, dest: string): Promise<void> {
  try {
    logger.info(`Copying "${src}" to "${dest}"`);
    await fs.copy(src, dest);
  } catch (err) {
    logger.error(`Error copying from "${src}" to "${dest}"`);
    throw err;
  }
}

async function executeCommand(command: string, path: string) {
  try {
    logger.info(`Executing "${command}" in working directory "${path}"`);
    const { stdout, stderr } = await execAsync(command, { cwd: path });
    if (stdout) {
      logger.info(stdout);
    }
    if (stderr) {
      logger.warn(stderr);
    }
  } catch (err) {
    logger.error(`Error executing command: ${command}`);
    throw err;
  }
}

(async () => {
  try {
    // Remove current build
    await remove('./dist/');
    
    // Copy config files
    await copy('./src/shared/docs/swagger.yml', './dist/src/shared/docs/swagger.yml');
    await copy('./src/shared/handler/error.yml', './dist/src/shared/handler/error.yml');
    await copy('./package.json', './dist/package.json');

    // Compile project
    await executeCommand('tsc --build tsconfig.json && tsc-alias -p tsconfig.json', './');
    logger.info('✔️ Project compiled successfully!');
  } catch (err) {
    logger.error(`Build process failed: ${err}`);
    process.exit(1);
  }
})();

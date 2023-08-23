import { rm, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { describe, expect, it } from 'vitest';
import { isExecutable, isReadable, isValidPath, isWritable } from './paths';

const currentDir = dirname(fileURLToPath(import.meta.url));

describe('is-valid-path', () => {
  it('returns true if the path exists', async () => {
    const existentPath = fileURLToPath(
      new URL('../constants/', import.meta.url)
    );
    const result = await isValidPath(existentPath);

    expect(result).toBe(true);
    expect.assertions(1);
  });

  it('returns false if the path does not exist', async () => {
    const inexistentPath = '/an/inexistent/path';
    const result = await isValidPath(inexistentPath);

    expect(result).toBe(false);
    expect.assertions(1);
  });
});

describe('is-executable', () => {
  it('returns true if the path is executable', async () => {
    const executablePath = fileURLToPath(
      new URL('../constants/', import.meta.url)
    );
    const result = await isExecutable(executablePath);

    expect(result).toBe(true);
    expect.assertions(1);
  });

  it('returns false if the path is not executable', async () => {
    const nonExecutablePath = fileURLToPath(
      new URL('./arrays.ts', import.meta.url)
    );
    const result = await isExecutable(nonExecutablePath);

    expect(result).toBe(false);
    expect.assertions(1);
  });
});

describe('is-readable', () => {
  it('returns true if the path is readable', async () => {
    const readablePath = fileURLToPath(
      new URL('../constants/', import.meta.url)
    );
    const result = await isReadable(readablePath);

    expect(result).toBe(true);
    expect.assertions(1);
  });

  it('returns false if the path is not readable', async () => {
    const unreadablePath = join(currentDir, 'unreadable.txt');

    await writeFile(unreadablePath, '', { encoding: 'utf8', mode: '200' });

    const result = await isReadable(unreadablePath);

    await rm(unreadablePath);

    expect(result).toBe(false);
    expect.assertions(1);
  });
});

describe('is-writable', () => {
  it('returns true if the path is writable', async () => {
    const writablePath = fileURLToPath(
      new URL('../constants/', import.meta.url)
    );
    const result = await isWritable(writablePath);

    expect(result).toBe(true);
    expect.assertions(1);
  });

  it('returns false if the path is not writable', async () => {
    const nonWritablePath = join(currentDir, 'non-writable.txt');

    await writeFile(nonWritablePath, '', { encoding: 'utf8', mode: '444' });

    const result = await isWritable(nonWritablePath);

    await rm(nonWritablePath);

    expect(result).toBe(false);
    expect.assertions(1);
  });
});

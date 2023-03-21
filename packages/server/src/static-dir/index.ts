import { join } from 'path';
import express, { type Express } from 'express';
import type { StaticDirConfig } from '../types';

/**
 * Concat the base path with entrypoint if needed.
 *
 * @param {string} entrypoint - An entrypoint path or filename.
 * @param {string} path - A base path.
 * @returns {string} The absolute entrypoint path.
 */
const getAbsoluteEntrypointFrom = (
  entrypoint: string,
  path: string
): string => {
  if (entrypoint.startsWith(path)) return entrypoint;
  return join(path, entrypoint);
};

/**
 * Serve a static directory.
 *
 * @param {Express} app - An Express application.
 * @param {StaticDirConfig} config - The static directory config.
 */
export const serveStaticDir = (
  app: Express,
  { entrypoint, path, route }: StaticDirConfig
) => {
  const absoluteEntrypoint = getAbsoluteEntrypointFrom(entrypoint, path);

  app.use(express['static'](path, { index: false }));
  app.get(route, (_req, res) => {
    res.sendFile(absoluteEntrypoint);
  });
};

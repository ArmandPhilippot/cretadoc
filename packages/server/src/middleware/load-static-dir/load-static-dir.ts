import express, { type RequestHandler } from 'express';
import type { StaticDirConfig } from '../../types';
import { getFilePathFrom } from '../../utils/helpers';

/**
 * Express middleware to serve a static directory.
 *
 * @param {Omit<StaticDirConfig, 'route'>} config - The static directory config.
 * @returns {RequestHandler} The request handler.
 */
export const loadStaticDir =
  ({ entrypoint, path }: Omit<StaticDirConfig, 'route'>): RequestHandler =>
  (_req, res, next) => {
    try {
      express.static(path, { index: false });
      res.sendFile(getFilePathFrom(entrypoint, path));
    } catch (error) {
      next(error);
    }
  };

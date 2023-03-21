import type { Express } from 'express';
import type { APIConfig } from '../types';

/**
 * Serve the API.
 *
 * @param {Express} app - An Express application.
 * @param {APIConfig} config - The API config.
 */
export const serveAPI = (app: Express, { instance, route }: APIConfig) => {
  app.use(route, (req, res) => {
    void (async () => {
      await instance(req, res);
    })();
  });
};

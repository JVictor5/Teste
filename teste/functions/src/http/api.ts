import { HttpsOptions, onRequest } from 'firebase-functions/v2/https';

import { createServer } from '@burand/functions/http';

import routes from './routes.js';

const app = createServer(routes);

const options: HttpsOptions = {
  cors: true,
  maxInstances: 20,
  region: 'southamerica-east1'
};

export const api = onRequest(options, app);

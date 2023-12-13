import fastify from 'fastify';
import cors from '@fastify/cors';

import routes from './modules/v1/repos/repo.routes';

const server = fastify({
  ajv: {
    customOptions: {
      removeAdditional: 'all',
      coerceTypes: true,
      useDefaults: true,
    },
  },
});

// ? config
await server.register(cors, { origin: '*' });

// ? routes
await server.register(routes, { prefix: 'api/v1' });

await server.ready();

export default server;

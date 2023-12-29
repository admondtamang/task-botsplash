import fastify from 'fastify';
import routes from './routes';
const server = fastify({
  ajv: {
    customOptions: {
      removeAdditional: 'all',
      coerceTypes: true,
      useDefaults: true,
    },
  },
});
await server.register(routes);
await server.ready();
export default server;
//# sourceMappingURL=server.js.map

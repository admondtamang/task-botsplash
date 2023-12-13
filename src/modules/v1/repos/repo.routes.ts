import { FastifyPluginAsync } from 'fastify';
import { reposController } from './repos.controller';

const routes: FastifyPluginAsync = async (server) => {
  server.get('/health-check', async function () {
    return { okay: 'okay' };
  });

  server.get('/repos/:username', reposController);
};

export default routes;

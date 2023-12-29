import { Octokit } from 'octokit';
const routes = async (server) => {
  server.get('/health-check', async function () {
    return { okay: 'okay' };
  });
  server.get('/repos/:username', async (request, reply) => {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const { username } = request.params;
    const response = await octokit.rest.repos.listForUser({
      username,
    });
    return {
      message: 'Users listed successfully',
      payload: response,
    };
  });
};
export default routes;
//# sourceMappingURL=index.js.map

import octokit from 'lib/octokit';
import httpStatus from 'http-status';
import { FastifyReply, FastifyRequest } from 'fastify';

interface RepoRequestParams {
  username: string;
}

interface RepoQueryParams {
  page?: number;
  per_page?: number;
}

export const reposController = async (
  request: FastifyRequest<{ Params: RepoRequestParams; Querystring: RepoQueryParams }>,
  reply: FastifyReply,
) => {
  const { username } = request.params;
  const { page, per_page } = request.query as { page?: number; per_page?: number };

  // ? Authorization to remove retieve limit
  const authorization = 'token ######';

  try {
    const response = await octokit.rest.repos.listForUser({
      username,
      page: page || 1,
      per_page: per_page || 10,
      headers: {
        authorization,
      },
    });

    // ? restructure for better visibility
    const repos = response.data.map((repo) => {
      return {
        id: repo.id,
        name: repo.name,
        stars: repo.stargazers_count,
      };
    });

    reply.status(httpStatus.OK).send({
      message: 'Users listed successfully',
      payload: repos,
    });
  } catch (error) {
    throw error;
  }
};

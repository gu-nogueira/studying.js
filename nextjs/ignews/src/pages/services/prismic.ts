import * as prismic from '@prismicio/client';
import * as prismicNext from '@prismicio/next';
import sm from '../../../sm.json';

// ** Utils
import requiredEnv from '@/utils/requiredEnv';

/**
 * The project's Prismic repository name.
 */
export const repositoryName = prismic.getRepositoryName(sm.apiEndpoint);

// Update the routes array to match your project's route structure
/** @type {prismic.ClientConfig['routes']} **/
const routes = [
  {
    type: 'post',
    path: '/asdasd',
  },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 */
export const createClient = ({
  previewData,
  req,
  ...config
}: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(sm.apiEndpoint, {
    routes,
    accessToken: requiredEnv('PRISMIC_ACCESS_TOKEN'),
    ...config,
  });

  prismicNext.enableAutoPreviews({
    client,
    previewData,
    req,
  });

  return client;
};

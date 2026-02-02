import { cacheExchange, createClient, fetchExchange } from 'urql';

export const urqlClient = createClient({
  url: 'http://localhost:4020/graphql',
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: {
    headers: {
      'backend-api-key': 'test',
    },
  },
});

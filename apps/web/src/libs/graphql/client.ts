import { cacheExchange, createClient, fetchExchange } from 'urql';

export const urqlClient = createClient({
  url: 'http://localhost:3000/graphql',
  exchanges: [cacheExchange, fetchExchange],
});

import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client';
import {SetContextLink} from '@apollo/client/link/context';

export type NetworkConfig = {
  url: string;
  getAccessToken?: () => string | null | undefined;
};

const noCache = {
  watchQuery: {fetchPolicy: 'no-cache' as const},
  query: {fetchPolicy: 'no-cache' as const},
  mutate: {fetchPolicy: 'no-cache' as const},
};

let client: ApolloClient | null = null;
let configuredUrl: string | null = null;
let getAccessToken: NetworkConfig['getAccessToken'];

function createClient(url: string) {
  const authLink = new SetContextLink(({headers}) => {
    const token = getAccessToken?.();
    return {
      headers: {
        ...headers,
        ...(token ? {Authorization: `Bearer ${token}`} : {}),
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(new HttpLink({uri: url})),
    cache: new InMemoryCache(),
    defaultOptions: noCache,
  });
}

export function configureNetwork(config: NetworkConfig) {
  getAccessToken = config.getAccessToken;
  if (client && configuredUrl === config.url) {
    return;
  }
  configuredUrl = config.url;
  client = createClient(config.url);
}

export function getNetworkClient() {
  if (!client) {
    throw new Error('NetworkProvider is missing. Wrap the app first.');
  }
  return client;
}

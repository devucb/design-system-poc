import { type ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client/react';
import {
  configureNetwork,
  getNetworkClient,
  type NetworkConfig,
} from './client';

export function NetworkProvider({
  url,
  getAccessToken,
  children,
}: NetworkConfig & { children: ReactNode }) {
  configureNetwork({ url, getAccessToken });
  return (
    <ApolloProvider client={getNetworkClient()}>{children}</ApolloProvider>
  );
}

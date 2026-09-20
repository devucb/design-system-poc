import 'react-native-gesture-handler/jestSetup';

const mockMmkvStore = new Map<string, string>();

export function clearMockStorage() {
  mockMmkvStore.clear();
}

jest.mock('react-native-mmkv', () => ({
  createMMKV: () => ({
    getString: (key: string) => mockMmkvStore.get(key),
    set: (key: string, value: string) => {
      mockMmkvStore.set(key, String(value));
    },
    remove: (key: string) => {
      mockMmkvStore.delete(key);
    },
  }),
}));

jest.mock('react-native-localize', () => ({
  getLocales: () => [{ languageCode: 'en', languageTag: 'en-US' }],
}));

jest.mock('react-native-svg', () => {
  const React = require('react');
  const { View } = require('react-native');
  const Mock = (props: object) => React.createElement(View, props);
  return {
    __esModule: true,
    default: Mock,
    Svg: Mock,
    Path: Mock,
    Polyline: Mock,
  };
});

jest.mock('@sentry/react-native', () => {
  const React = require('react');
  return {
    init: () => {},
    wrap: (component: unknown) => component,
    captureException: () => {},
    setUser: () => {},
    setTag: () => {},
    reactNavigationIntegration: () => ({
      registerNavigationContainer: () => {},
    }),
    ErrorBoundary: ({ children }: { children: unknown }) =>
      React.createElement(React.Fragment, null, children),
  };
});

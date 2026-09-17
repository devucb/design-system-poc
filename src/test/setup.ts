import 'react-native-gesture-handler/jestSetup';

const mockMmkvStore = new Map<string, string>();

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
  getLocales: () => [{languageCode: 'en', languageTag: 'en-US'}],
}));

jest.mock('react-native-vector-icons/Ionicons', () => {
  const React = require('react');
  const {Text} = require('react-native');
  return {
    __esModule: true,
    default: (props: object) => React.createElement(Text, props),
  };
});

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useScrollToTop: () => {},
  };
});

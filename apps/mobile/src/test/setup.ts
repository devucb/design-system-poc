import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-config', () => ({
  __esModule: true,
  default: {
    GRAPHQL_URL: 'http://localhost:4000/graphql',
    SENTRY_DSN: '',
    SENTRY_TRACES_SAMPLE_RATE: '1',
  },
}));

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

jest.mock('@shopify/react-native-skia', () => {
  const React = require('react');
  const { View } = require('react-native');
  const Mock = (props: object) => React.createElement(View, props);
  return {
    __esModule: true,
    Canvas: Mock,
    RoundedRect: Mock,
    Path: Mock,
    Circle: Mock,
    Group: Mock,
    Text: Mock,
    matchFont: () => ({
      measureText: (text: string) => ({
        x: 0,
        y: 0,
        width: text.length * 6,
        height: 12,
      }),
    }),
    useFont: () => ({
      measureText: (text: string) => ({
        x: 0,
        y: 0,
        width: text.length * 6,
        height: 12,
      }),
    }),
  };
});

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

jest.mock('../../../../packages/native/src/NativeHaptics', () => ({
  __esModule: true,
  default: {trigger: jest.fn()},
}));

jest.mock('../../../../packages/native/src/NativeAppEnv', () => ({
  __esModule: true,
  default: {getAppEnv: () => 'dev'},
}));

jest.mock('@react-native-community/datetimepicker', () => {
  const React = require('react');
  const {View} = require('react-native');
  function MockDateTimePicker() {
    return React.createElement(View, {testID: 'native-datetimepicker'});
  }
  return {
    __esModule: true,
    default: MockDateTimePicker,
  };
});

jest.mock('@gorhom/bottom-sheet', () => {
  const React = require('react');
  const {View} = require('react-native');
  function BottomSheetModal(props: {children?: unknown}) {
    return React.createElement(View, {testID: 'sheet'}, props.children);
  }
  function BottomSheetModalProvider(props: {children: unknown}) {
    return props.children;
  }
  function BottomSheetBackdrop() {
    return null;
  }
  return {
    __esModule: true,
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetView: View,
    BottomSheetBackdrop,
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

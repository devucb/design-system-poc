const rnPreset = require('@react-native/jest-preset');

module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: [...rnPreset.setupFiles, '<rootDir>/src/test/setup.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/test/portableStories.ts'],
  moduleNameMapper: {
    '^@auth/(.*)$': '<rootDir>/src/auth/$1',
    '^@bootstrap/(.*)$': '<rootDir>/src/bootstrap/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@i18n/(.*)$': '<rootDir>/src/i18n/$1',
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@storage/(.*)$': '<rootDir>/src/storage/$1',
    '^@theme/(.*)$': '<rootDir>/src/theme/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|@shopify/restyle|react-native-gesture-handler|react-native-screens|react-native-safe-area-context|react-native-localize|react-native-vector-icons|storybook|@storybook)/)',
  ],
};

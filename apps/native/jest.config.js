const path = require('path');
const rnPreset = require('@react-native/jest-preset');

const workspaceRoot = path.resolve(__dirname, '../..');

module.exports = {
  preset: '@react-native/jest-preset',
  roots: ['<rootDir>/src', '<rootDir>/../../packages/ui/src'],
  setupFiles: [...rnPreset.setupFiles, '<rootDir>/src/test/setup.ts'],
  setupFilesAfterEnv: [
    '<rootDir>/src/test/portableStories.ts',
    '<rootDir>/src/test/resetStores.ts',
  ],
  moduleNameMapper: {
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
    '^@ds/ui/(.*)$': `${workspaceRoot}/packages/ui/src/$1`,
    '^@ds/theme/(.*)$': `${workspaceRoot}/packages/theme/src/$1`,
    '^@ds/i18n/(.*)$': `${workspaceRoot}/packages/i18n/src/$1`,
    '^@ds/navigation/(.*)$': `${workspaceRoot}/packages/navigation/src/$1`,
    '^@ds/session/(.*)$': `${workspaceRoot}/packages/session/src/$1`,
    '^@ds/storage/(.*)$': `${workspaceRoot}/packages/storage/src/$1`,
    '^@ds/telemetry/(.*)$': `${workspaceRoot}/packages/telemetry/src/$1`,
    '^@ds/views/(.*)$': `${workspaceRoot}/packages/views/src/$1`,
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|@sentry|@tamagui|tamagui|react-native-gesture-handler|react-native-screens|react-native-safe-area-context|react-native-localize|react-native-svg|storybook|@storybook|zustand)/)',
  ],
};

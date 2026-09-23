const path = require('path');
const rnPreset = require('@react-native/jest-preset');

const workspaceRoot = path.resolve(__dirname, '../..');

module.exports = {
  preset: '@react-native/jest-preset',
  roots: [
    '<rootDir>/src',
    '<rootDir>/../../packages/ui/src',
    '<rootDir>/../../packages/native/src',
  ],
  setupFiles: [
    ...rnPreset.setupFiles,
    '@shopify/flash-list/jestSetup',
    '<rootDir>/src/test/setup.ts',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/src/test/portableStories.ts',
    '<rootDir>/src/test/resetStores.ts',
  ],
  moduleNameMapper: {
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
    '^@ds/ui$': `${workspaceRoot}/packages/ui/src/index.ts`,
    '^@ds/ui/(.*)$': `${workspaceRoot}/packages/ui/src/$1`,
    '^@ds/controller$': `${workspaceRoot}/packages/controller/src/index.ts`,
    '^@ds/controller/(.*)$': `${workspaceRoot}/packages/controller/src/$1`,
    '^@ds/network$': `${workspaceRoot}/packages/network/src/index.ts`,
    '^@ds/network/(.*)$': `${workspaceRoot}/packages/network/src/$1`,
    '^@ds/theme$': `${workspaceRoot}/packages/theme/src/index.ts`,
    '^@ds/theme/(.*)$': `${workspaceRoot}/packages/theme/src/$1`,
    '^@ds/language$': `${workspaceRoot}/packages/language/src/index.ts`,
    '^@ds/language/(.*)$': `${workspaceRoot}/packages/language/src/$1`,
    '^@ds/navigation$': `${workspaceRoot}/packages/navigation/src/index.ts`,
    '^@ds/navigation/(.*)$': `${workspaceRoot}/packages/navigation/src/$1`,
    '^@ds/store$': `${workspaceRoot}/packages/store/src/index.ts`,
    '^@ds/store/(.*)$': `${workspaceRoot}/packages/store/src/$1`,
    '^@ds/storage$': `${workspaceRoot}/packages/storage/src/index.ts`,
    '^@ds/storage/(.*)$': `${workspaceRoot}/packages/storage/src/$1`,
    '^@ds/native$': `${workspaceRoot}/packages/native/src/index.ts`,
    '^@ds/native/(.*)$': `${workspaceRoot}/packages/native/src/$1`,
    '^@ds/telemetry$': `${workspaceRoot}/packages/telemetry/src/index.ts`,
    '^@ds/telemetry/(.*)$': `${workspaceRoot}/packages/telemetry/src/$1`,
    '^@ds/views$': `${workspaceRoot}/packages/views/src/index.ts`,
    '^@ds/views/(.*)$': `${workspaceRoot}/packages/views/src/$1`,
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|@sentry|@shopify/flash-list|@tamagui|tamagui|@gorhom|@apollo|rxjs|react-native-gesture-handler|react-native-screens|react-native-safe-area-context|react-native-localize|react-native-svg|storybook|@storybook|zustand|@hookform|react-hook-form|yup)/)',
  ],
};

const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {withSentryConfig} = require('@sentry/react-native/metro');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  watchFolders: [workspaceRoot],
  resolver: {
    disableHierarchicalLookup: true,
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(workspaceRoot, 'node_modules'),
    ],
    extraNodeModules: {
      '@ds/ui': path.resolve(workspaceRoot, 'packages/ui/src'),
      '@ds/theme': path.resolve(workspaceRoot, 'packages/theme/src'),
      '@ds/i18n': path.resolve(workspaceRoot, 'packages/i18n/src'),
      '@ds/navigation': path.resolve(workspaceRoot, 'packages/navigation/src'),
      '@ds/session': path.resolve(workspaceRoot, 'packages/session/src'),
      '@ds/storage': path.resolve(workspaceRoot, 'packages/storage/src'),
      '@ds/telemetry': path.resolve(workspaceRoot, 'packages/telemetry/src'),
      '@ds/views': path.resolve(workspaceRoot, 'packages/views/src'),
    },
  },
};

module.exports = withSentryConfig(
  mergeConfig(getDefaultConfig(projectRoot), config),
);

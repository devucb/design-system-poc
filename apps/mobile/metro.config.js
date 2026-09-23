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
      '@ds/controller': path.resolve(workspaceRoot, 'packages/controller/src'),
      '@ds/network': path.resolve(workspaceRoot, 'packages/network/src'),
      '@ds/theme': path.resolve(workspaceRoot, 'packages/theme/src'),
      '@ds/language': path.resolve(workspaceRoot, 'packages/language/src'),
      '@ds/navigation': path.resolve(workspaceRoot, 'packages/navigation/src'),
      '@ds/store': path.resolve(workspaceRoot, 'packages/store/src'),
      '@ds/storage': path.resolve(workspaceRoot, 'packages/storage/src'),
      '@ds/native': path.resolve(workspaceRoot, 'packages/native/src'),
      '@ds/telemetry': path.resolve(workspaceRoot, 'packages/telemetry/src'),
      '@ds/views': path.resolve(workspaceRoot, 'packages/views/src'),
    },
  },
};

module.exports = withSentryConfig(
  mergeConfig(getDefaultConfig(projectRoot), config),
);

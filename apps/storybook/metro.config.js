const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const {
  withStorybook,
} = require('@storybook/react-native/metro/withStorybook');

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
      '@ds/theme': path.resolve(workspaceRoot, 'packages/theme/src'),
      '@ds/language': path.resolve(workspaceRoot, 'packages/language/src'),
      '@ds/storage': path.resolve(workspaceRoot, 'packages/storage/src'),
      '@ds/native': path.resolve(workspaceRoot, 'packages/native/src'),
    },
  },
};

module.exports = withStorybook(
  mergeConfig(getDefaultConfig(projectRoot), config),
  { enabled: true },
);

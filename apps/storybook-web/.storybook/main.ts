import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';
import { tamaguiPlugin } from '@tamagui/vite-plugin';
import { mergeConfig } from 'vite';

const appRoot = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(appRoot, '../../..');

const config: StorybookConfig = {
  stories: [
    '../../../packages/ui/src/**/*.stories.@(ts|tsx)',
    '../../storybook/src/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    '@storybook/addon-themes',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    '@chromatic-com/storybook',
  ],
  framework: '@storybook/react-vite',
  docs: {
    defaultName: 'Docs',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  staticDirs: [{ from: '../../web/public/fonts', to: '/fonts' }],
  core: {
    disableTelemetry: true,
  },
  async viteFinal(viteConfig) {
    return mergeConfig(viteConfig, {
      plugins: [
        tamaguiPlugin({
          config: path.resolve(
            workspaceRoot,
            'packages/theme/src/tamagui.config.ts',
          ),
          components: ['tamagui'],
        }),
      ],
      define: {
        global: 'window',
        'process.env.NODE_ENV': JSON.stringify(
          process.env.NODE_ENV ?? 'development',
        ),
      },
      resolve: {
        dedupe: ['react', 'react-dom', 'react-native-web'],
        extensions: [
          '.web.tsx',
          '.web.ts',
          '.web.jsx',
          '.web.js',
          '.tsx',
          '.ts',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          'react-native': 'react-native-web',
          '@storybook/react-native': '@storybook/react',
          'react-native-localize': path.resolve(
            appRoot,
            '../src/shims/react-native-localize.ts',
          ),
          '@ds/ui': path.resolve(workspaceRoot, 'packages/ui/src'),
          '@ds/controller': path.resolve(
            workspaceRoot,
            'packages/controller/src',
          ),
          '@ds/theme': path.resolve(workspaceRoot, 'packages/theme/src'),
          '@ds/language': path.resolve(workspaceRoot, 'packages/language/src'),
          '@ds/storage': path.resolve(workspaceRoot, 'packages/storage/src'),
          '@ds/native': path.resolve(workspaceRoot, 'packages/native/src'),
        },
      },
      optimizeDeps: {
        include: ['react-native-web', '@shopify/flash-list', 'recharts'],
        esbuildOptions: {
          resolveExtensions: [
            '.web.tsx',
            '.web.ts',
            '.web.jsx',
            '.web.js',
            '.tsx',
            '.ts',
            '.jsx',
            '.js',
          ],
          loader: {
            '.js': 'jsx',
          },
        },
      },
      server: {
        port: 6006,
        host: true,
      },
    });
  },
};

export default config;

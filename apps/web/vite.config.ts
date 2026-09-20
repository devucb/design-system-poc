import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { tamaguiPlugin } from '@tamagui/vite-plugin';
import { sentryVitePlugin } from '@sentry/vite-plugin';

const workspaceRoot = path.resolve(__dirname, '../..');

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, workspaceRoot, '');
  const sentryAuthToken = env.SENTRY_AUTH_TOKEN?.trim();
  const uploadSourcemaps = Boolean(sentryAuthToken);

  return {
    envDir: workspaceRoot,
    build: {
      sourcemap: uploadSourcemaps ? 'hidden' : false,
    },
    plugins: [
      tamaguiPlugin({
        config: path.resolve(
          workspaceRoot,
          'packages/theme/src/tamagui.config.ts',
        ),
        components: ['tamagui'],
      }),
      react(),
      sentryVitePlugin({
        org: env.SENTRY_ORG,
        project: env.SENTRY_PROJECT,
        authToken: sentryAuthToken,
        disable: !uploadSourcemaps,
        sourcemaps: {
          filesToDeleteAfterUpload: ['./dist/**/*.map'],
        },
      }),
    ],
    resolve: {
      dedupe: [
        'react',
        'react-dom',
        'react-native-web',
        '@react-navigation/native',
      ],
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
        'react-native-localize': path.resolve(
          __dirname,
          'src/shims/react-native-localize.ts',
        ),
        '@ds/ui': path.resolve(workspaceRoot, 'packages/ui/src'),
        '@ds/theme': path.resolve(workspaceRoot, 'packages/theme/src'),
        '@ds/i18n': path.resolve(workspaceRoot, 'packages/i18n/src'),
        '@ds/navigation': path.resolve(
          workspaceRoot,
          'packages/navigation/src',
        ),
        '@ds/session': path.resolve(workspaceRoot, 'packages/session/src'),
        '@ds/storage': path.resolve(workspaceRoot, 'packages/storage/src'),
        '@ds/telemetry': path.resolve(workspaceRoot, 'packages/telemetry/src'),
        '@ds/views': path.resolve(workspaceRoot, 'packages/views/src'),
      },
    },
    define: {
      global: 'window',
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV ?? 'development',
      ),
    },
    optimizeDeps: {
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
      port: 4200,
      host: true,
    },
  };
});

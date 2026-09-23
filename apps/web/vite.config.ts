import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { tamaguiPlugin } from '@tamagui/vite-plugin';
import { sentryVitePlugin } from '@sentry/vite-plugin';

const workspaceRoot = path.resolve(__dirname, '../..');

export default defineConfig(({ mode }) => {
  // Token comes from the process environment only. loadEnv must not supply it.
  const sentryAuthToken = process.env.SENTRY_AUTH_TOKEN?.trim();
  const flavor =
    mode === 'development' ? 'dev' : mode === 'production' ? 'prod' : mode;
  const env = loadEnv(flavor, workspaceRoot, '');
  const uploadSourcemaps = Boolean(sentryAuthToken);
  const appEnv = flavor;
  const graphqlUrl = env.GRAPHQL_URL || env.VITE_GRAPHQL_URL || '';
  const traces = env.SENTRY_TRACES_SAMPLE_RATE || '1';

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
        '@ds/controller': path.resolve(workspaceRoot, 'packages/controller/src'),
        '@ds/network': path.resolve(workspaceRoot, 'packages/network/src'),
        '@ds/theme': path.resolve(workspaceRoot, 'packages/theme/src'),
        '@ds/language': path.resolve(workspaceRoot, 'packages/language/src'),
        '@ds/navigation': path.resolve(
          workspaceRoot,
          'packages/navigation/src',
        ),
        '@ds/store': path.resolve(workspaceRoot, 'packages/store/src'),
        '@ds/storage': path.resolve(workspaceRoot, 'packages/storage/src'),
        '@ds/native': path.resolve(workspaceRoot, 'packages/native/src'),
        '@ds/telemetry': path.resolve(workspaceRoot, 'packages/telemetry/src'),
        '@ds/views': path.resolve(workspaceRoot, 'packages/views/src'),
      },
    },
    define: {
      global: 'window',
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV ?? 'development',
      ),
      'import.meta.env.APP_ENV': JSON.stringify(appEnv),
      'import.meta.env.GRAPHQL_URL': JSON.stringify(graphqlUrl),
      'import.meta.env.SENTRY_TRACES_SAMPLE_RATE': JSON.stringify(traces),
    },
    optimizeDeps: {
      include: [
        '@apollo/client',
        '@apollo/client/react',
        '@shopify/flash-list',
        'rxjs',
        'recharts',
      ],
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

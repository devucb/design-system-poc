const path = require('path');

// Public app config is read natively by react-native-config (see src/config/env.ts).
// Do not load .env files here: Metro must not inline URLs or DSNs, and secrets
// must never enter the bundle.

module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', { target: '19' }],
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.native.js',
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.json',
        ],
        alias: {
          '@navigation': './src/navigation',
          '@ds/ui': path.resolve(__dirname, '../../packages/ui/src/index'),
          '@ds/controller': path.resolve(
            __dirname,
            '../../packages/controller/src/index',
          ),
          '@ds/network': path.resolve(
            __dirname,
            '../../packages/network/src/index',
          ),
          '@ds/theme': path.resolve(__dirname, '../../packages/theme/src/index'),
          '@ds/language': path.resolve(__dirname, '../../packages/language/src/index'),
          '@ds/navigation': path.resolve(
            __dirname,
            '../../packages/navigation/src/index',
          ),
          '@ds/store': path.resolve(
            __dirname,
            '../../packages/store/src/index',
          ),
          '@ds/storage': path.resolve(
            __dirname,
            '../../packages/storage/src/index',
          ),
          '@ds/native': path.resolve(
            __dirname,
            '../../packages/native/src/index',
          ),
          '@ds/telemetry': path.resolve(
            __dirname,
            '../../packages/telemetry/src/index',
          ),
          '@ds/views': path.resolve(__dirname, '../../packages/views/src/index'),
        },
      },
    ],
    'transform-inline-environment-variables',
    'react-native-worklets/plugin',
  ],
  presets: ['module:@react-native/babel-preset'],
};

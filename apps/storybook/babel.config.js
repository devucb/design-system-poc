const path = require('path');

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
          '@ds/ui': path.resolve(__dirname, '../../packages/ui/src/index'),
          '@ds/controller': path.resolve(
            __dirname,
            '../../packages/controller/src/index',
          ),
          '@ds/theme': path.resolve(__dirname, '../../packages/theme/src/index'),
          '@ds/language': path.resolve(__dirname, '../../packages/language/src/index'),
          '@ds/storage': path.resolve(
            __dirname,
            '../../packages/storage/src/index',
          ),
          '@ds/native': path.resolve(
            __dirname,
            '../../packages/native/src/index',
          ),
        },
      },
    ],
    'react-native-worklets/plugin',
  ],
  presets: ['module:@react-native/babel-preset'],
};

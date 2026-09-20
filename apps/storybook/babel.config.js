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
          '@ds/ui': '../../packages/ui/src',
          '@ds/theme': '../../packages/theme/src',
          '@ds/i18n': '../../packages/i18n/src',
          '@ds/storage': '../../packages/storage/src',
        },
      },
    ],
    'react-native-worklets/plugin',
  ],
  presets: ['module:@react-native/babel-preset'],
};

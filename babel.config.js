module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {target: '19'}],
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
          '@auth': './src/auth',
          '@bootstrap': './src/bootstrap',
          '@components': './src/components',
          '@i18n': './src/i18n',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@storage': './src/storage',
          '@theme': './src/theme',
        },
      },
    ],
    'transform-inline-environment-variables',
    'react-native-worklets/plugin',
  ],
  presets: ['module:@react-native/babel-preset'],
};

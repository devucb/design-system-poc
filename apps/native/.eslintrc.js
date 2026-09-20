module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['no-barrel-files'],
  rules: {
    'no-barrel-files/no-barrel-files': 'error',
    'react/no-unstable-nested-components': ['error', {allowAsProps: true}],
  },
  ignorePatterns: [
    'android/',
    'ios/',
    'coverage/',
    '.rn-template/',
  ],
};

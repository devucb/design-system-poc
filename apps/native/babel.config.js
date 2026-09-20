const fs = require('fs');
const path = require('path');

function loadDotEnv(file) {
  try {
    const text = fs.readFileSync(file, 'utf8');
    for (const line of text.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) {
        continue;
      }
      const eq = trimmed.indexOf('=');
      if (eq === -1) {
        continue;
      }
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  } catch {
    // Root `.env` is optional.
  }
}

const APP_ENVS = ['dev', 'uat', 'prod'];
const appEnv = APP_ENVS.includes(process.env.APP_ENV)
  ? process.env.APP_ENV
  : 'dev';
process.env.APP_ENV = appEnv;
loadDotEnv(path.resolve(__dirname, `../../.env.${appEnv}`));
loadDotEnv(path.resolve(__dirname, '../../.env'));

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
          '@ds/ui': '../../packages/ui/src',
          '@ds/theme': '../../packages/theme/src',
          '@ds/i18n': '../../packages/i18n/src',
          '@ds/navigation': '../../packages/navigation/src',
          '@ds/session': '../../packages/session/src',
          '@ds/storage': '../../packages/storage/src',
          '@ds/telemetry': '../../packages/telemetry/src',
          '@ds/views': '../../packages/views/src',
        },
      },
    ],
    'transform-inline-environment-variables',
    'react-native-worklets/plugin',
  ],
  presets: ['module:@react-native/babel-preset'],
};

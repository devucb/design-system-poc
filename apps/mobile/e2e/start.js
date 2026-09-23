/**
 * Detox `start` hook: product Metro on 8081, plus the GraphQL BFF if it is down.
 * Storybook Metro on the same port will steal the bundle — stop it first.
 */
const {spawn} = require('node:child_process');
const path = require('node:path');

const root = path.resolve(__dirname, '../../..');
const graphqlUrl = process.env.GRAPHQL_URL ?? 'http://localhost:4000/graphql';
const children = [];

function run(command, cwd, extraEnv) {
  const child = spawn(command, {
    cwd,
    env: {...process.env, ...extraEnv},
    stdio: 'inherit',
    shell: true,
  });
  children.push(child);
  child.on('exit', code => {
    if (code && code !== 0) {
      process.exit(code);
    }
  });
  return child;
}

async function bffReady() {
  try {
    const response = await fetch(graphqlUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({query: '{ health { status } }'}),
    });
    const body = await response.json();
    return body?.data?.health?.status === 'ok';
  } catch {
    return false;
  }
}

function stopChildren() {
  for (const child of children) {
    if (!child.killed) {
      child.kill('SIGTERM');
    }
  }
}

async function main() {
  process.on('exit', stopChildren);
  process.on('SIGINT', () => process.exit(0));
  process.on('SIGTERM', () => process.exit(0));

  if (!(await bffReady())) {
    run(
      'npx tsc-watch --onSuccess "node --env-file=../../.env.dev dist/main.js"',
      path.join(root, 'apps/bff'),
    );
  }

  run('npx react-native start --port 8081', path.join(root, 'apps/mobile'));
}

void main();

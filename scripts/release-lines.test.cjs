'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { linesForFiles } = require('./release-lines.cjs');

test('a BFF-only change releases the BFF line', () => {
  assert.deepEqual(
    linesForFiles(['apps/bff/src/main.ts', 'apps/bff/Dockerfile', '.dockerignore']),
    { mobile: false, bff: true, root: false },
  );
});

test('a lockfile beside the BFF does not release the app', () => {
  assert.deepEqual(linesForFiles(['apps/bff/src/main.ts', 'package-lock.json']), {
    mobile: false,
    bff: true,
    root: true,
  });
});

test('the catalog releases the app and the root project', () => {
  assert.deepEqual(linesForFiles(['packages/ui/src/Button.tsx']), {
    mobile: true,
    bff: false,
    root: true,
  });
});

test('app, web, and repo files stay on their own lines', () => {
  assert.deepEqual(linesForFiles(['apps/mobile/App.tsx']), {
    mobile: true,
    bff: false,
    root: false,
  });
  assert.deepEqual(linesForFiles(['apps/web/src/main.tsx']), {
    mobile: true,
    bff: false,
    root: false,
  });
  assert.deepEqual(linesForFiles(['README.md']), {
    mobile: false,
    bff: false,
    root: true,
  });
  assert.deepEqual(linesForFiles([]), {
    mobile: false,
    bff: false,
    root: false,
  });
});

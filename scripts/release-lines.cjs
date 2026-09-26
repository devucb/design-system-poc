'use strict';

const { execFileSync } = require('node:child_process');

// A commit counts for a line when at least one file matches.
// packages/ releases both the catalog (root) and the app (mobile).
const LINES = {
  mobile: [
    /^apps\/mobile\//,
    /^apps\/web\//,
    /^apps\/storybook\//,
    /^apps\/storybook-web\//,
    /^packages\//,
  ],
  bff: [/^apps\/bff\//, /^\.dockerignore$/],
  root: [
    /^package\.json$/,
    /^package-lock\.json$/,
    /^nx\.json$/,
    /^scripts\//,
    /^\.github\//,
    /^README\.md$/,
    /^\.releaserc\./,
    /^release\.config\.js$/,
    /^packages\//,
  ],
};

function matchesLine(file, line) {
  return LINES[line].some((pattern) => pattern.test(file));
}

function filesTouchLine(files, line) {
  return files.some((file) => matchesLine(file, line));
}

function linesForFiles(files) {
  return {
    mobile: filesTouchLine(files, 'mobile'),
    bff: filesTouchLine(files, 'bff'),
    root: filesTouchLine(files, 'root'),
  };
}

function filesInCommit(hash) {
  const output = execFileSync(
    'git',
    ['diff-tree', '--no-commit-id', '--name-only', '-r', hash],
    { encoding: 'utf8' },
  );
  return output.split('\n').filter(Boolean);
}

function analyzeCommits(pluginConfig, context) {
  const line = pluginConfig.line;
  if (!LINES[line]) {
    throw new Error(`Unknown release line "${line}"`);
  }
  context.commits = context.commits.filter((commit) =>
    filesTouchLine(filesInCommit(commit.hash), line),
  );
  return null;
}

function changedFiles(before, after) {
  const emptyBase = !before || /^0+$/.test(before);
  const output = execFileSync(
    'git',
    emptyBase
      ? ['ls-tree', '-r', '--name-only', after]
      : ['diff', '--name-only', before, after],
    { encoding: 'utf8' },
  );
  return output.split('\n').filter(Boolean);
}

function githubOutput(before, after) {
  const lines = linesForFiles(changedFiles(before, after));
  return Object.entries(lines)
    .map(([name, touched]) => `${name}=${touched}`)
    .join('\n');
}

if (require.main === module) {
  const before = process.argv[2];
  const after = process.argv[3];
  if (!after) {
    throw new Error('Usage: node scripts/release-lines.cjs <before> <after>');
  }
  process.stdout.write(`${githubOutput(before, after)}\n`);
}

module.exports = {
  LINES,
  analyzeCommits,
  filesTouchLine,
  linesForFiles,
  matchesLine,
};

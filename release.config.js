'use strict';

const line = process.env.RELEASE_LINE;
const configs = {
  root: './.releaserc.root.json',
  mobile: './.releaserc.mobile.json',
  bff: './.releaserc.bff.json',
};

if (!configs[line]) {
  throw new Error('Set RELEASE_LINE to root, mobile, or bff');
}

module.exports = require(configs[line]);

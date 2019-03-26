const path = require('path');
const reqRoot = require('app-root-path').require;
const commitTypes = require('../shared/commitTypes');
const parserOpts = require('../shared/parserOpts');

const pkg = reqRoot('package.json');
const options = {
  gitAssets: [],
  githubAssets: [],
  additionalPrepareSteps: [],
  ...pkg.release['contribution-tools-options']
};
const changelogGenerator = 'changelogs/base';
const releaseRules = commitTypes.map((entry) => ({
  type: entry.type,
  release: entry.release
}));

releaseRules.push({
  breaking: true,
  release: 'major'
});

module.exports = {
  branch: 'master',
  generateNotes: {
    config: path.resolve(__dirname, changelogGenerator)
  },
  analyzeCommits: {
    releaseRules,
    parserOpts
  },
  verifyConditions: ['@semantic-release/git', '@semantic-release/github', '@semantic-release/npm'],
  prepare: [
    '@semantic-release/npm',
    ...options.additionalPrepareSteps,
    {
      // eslint-disable-next-line no-template-curly-in-string
      message: 'chore: release ${nextRelease.version}',
      assets: ['package.json', 'package-lock.json'].concat(options.gitAssets),
      path: '@semantic-release/git'
    }
  ],
  publish: [
    '@semantic-release/npm',
    {
      path: '@semantic-release/github',
      assets: options.githubAssets
    }
  ],
  success: false,
  fail: false
};

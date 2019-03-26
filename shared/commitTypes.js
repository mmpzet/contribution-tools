module.exports = [
  {
    type: 'feat',
    release: 'minor',
    description: 'A new feature',
    label: '✨ Features',
    changelogOrder: 9
  },
  {
    type: 'fix',
    release: 'patch',
    description: 'A bug fix',
    label: '🐛 Bug Fixes',
    changelogOrder: 10
  },
  {
    type: 'docs',
    release: 'patch',
    description: 'Documentation only changes',
    label: '📕 Documentation',
    changelogOrder: 2
  },
  {
    type: 'style',
    release: 'patch',
    description: 'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
    label: '💄 Code Style',
    changelogOrder: 4
  },
  {
    type: 'refactor',
    release: 'patch',
    description: 'A code change that neither fixes a bug or adds a feature',
    label: '♻️ Code Refactoring',
    changelogOrder: 6
  },
  {
    type: 'perf',
    release: 'patch',
    description: 'A code change that improves performance',
    label: '⚡️ Performance Improvements',
    changelogOrder: 7
  },
  {
    type: 'test',
    release: 'patch',
    description: 'Adding missing tests',
    label: '🔬 Tests',
    changelogOrder: 5
  },
  {
    type: 'chore',
    release: 'patch',
    description: 'Changes to the build process or auxiliary tools and libraries such as documentation generation',
    label: '🤖 Build Process',
    changelogOrder: 3
  }
];

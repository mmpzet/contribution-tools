/* eslint-disable no-process-env, id-match */
const isCI = Boolean(process.env.CI);
const watchMode = process.argv.indexOf('--watchAll') !== -1 || process.argv.indexOf('--watch') !== -1;
const forceCoverage = process.argv.indexOf('--coverage') !== -1;
const coverageReporters = isCI ? ['json', 'cobertura', 'text', 'html', 'lcov'] : ['text-summary', 'html', 'text'];
const reporters = isCI ? ['default', ['jest-junit', {
  suiteName: 'jest',
  output: './reports/jest/results.xml'}
]] : ['default'];

module.exports = {
  clearMocks: true,
  cacheDirectory: './node_modules/.cache/jest',
  collectCoverage: isCI || forceCoverage || !watchMode,
  reporters,
  coverageReporters,
  coveragePathIgnorePatterns: [
    'jest.config.js'
  ],
  coverageDirectory: './coverage',
  coverageThreshold: {
    global: {
      lines: 0,
      branches: 0,
      functions: 0,
      statements: 0
    }
  },
  snapshotSerializers: [
    'jest-snapshot-serializer-function-name'
  ],
  verbose: true
};

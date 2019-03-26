module.exports = {
  headerCorrespondence: ['type', 'subject'],
  headerPattern: /^(\w*): (.*)$/,
  noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
  referenceActions: null,
  issuePrefixes: ['#'],
  revertCorrespondence: ['header', 'hash'],
  revertPattern: /^revert:\s([\s\S]*?)\s*This reverts commit (\w*)\./
};

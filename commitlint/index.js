const commitRules = require('../shared/commitRules');
const commitTypes = require('../shared/commitTypes');

module.exports = {
  rules: {
    'body-leading-blank': [2, 'always'],
    'body-max-length': [0],
    'body-min-length': [0],
    'footer-leading-blank': [2, 'always'],
    'footer-max-length': [0],
    'footer-min-length': [0],
    'header-max-length': [2, 'always', commitRules.headerMaxLength],
    'header-min-length': [1, 'always', commitRules.headerMinLength],
    'scope-case': [2, 'always', 'lowerCase'],
    'scope-empty': [2, 'always'],
    'scope-max-length': [0],
    'scope-min-length': [0],
    'subject-case': [1, 'always', 'lowerCase'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never'],
    'subject-max-length': [0],
    'subject-min-length': [0],
    'type-case': [2, 'always', 'lowerCase'],
    'type-empty': [2, 'never'],
    'type-enum': [2, 'always', commitTypes.map((entry) => entry.type)],
    'type-max-length': [0],
    'type-min-length': [0]
  }
};

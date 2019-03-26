const chalk = require('chalk');
const wrap = require('word-wrap');
const commitTypes = require('../shared/commitTypes');
const commitRules = require('../shared/commitRules');

const longestTypeLength = Math.max(
  ...commitTypes.map((entry) => entry.type.length)
);
const choices = commitTypes.map((entry) => {
  const firstLinePadding = ' '.repeat(longestTypeLength - entry.type.length);
  const description = wrap(entry.description, {
    indent: ' '.repeat(longestTypeLength + 4),
    width: 60
  });

  return {
    value: entry.type,
    name: `${chalk.bold(entry.type)}:${firstLinePadding} ${description.trim()}`
  };
});

const questions = [
  {
    choices,
    message: 'Select the type of change that you\'re committing:',
    name: 'type',
    type: 'list'
  },
  {
    filter (input) {
      let subject;

      subject = input.trim();
      while (subject.endsWith('.')) {
        subject = subject.substr(0, subject.length - 1).trim();
      }

      return subject;
    },
    leadingLabel: (answers) => `${answers.type}: `,
    maxLength: commitRules.headerMaxLength,
    message: 'Write a short, imperative mood description of the change:',
    name: 'subject',
    type: 'limitedInput',
    validate (input) {
      return input.length >= commitRules.headerMinLength || `The subject must have at least ${commitRules.headerMinLength} characters`;
    }
  },
  {
    message: 'Provide a longer description of the change:\n',
    name: 'body',
    type: 'input'
  },
  {
    message: 'List any breaking changes:\n BREAKING CHANGE:',
    name: 'breaking',
    type: 'input'
  },
  {
    message: 'Reference any task that this commit closes:\n Issues:',
    name: 'footer',
    type: 'input'
  }
];

module.exports = questions;

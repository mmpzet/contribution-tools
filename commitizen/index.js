const inquirer = require('inquirer');
const wrap = require('word-wrap');
const commitRules = require('../shared/commitRules');
const questions = require('./questions');
const LimitedInput = require('./prompts/LimitedInput');

inquirer.registerPrompt('limitedInput', LimitedInput);

module.exports = {
  prompter (cz, commit) {
    const promptQuestions = questions;

    return inquirer.prompt(promptQuestions).then((answers) => {
      const wrapOptions = {
        indent: '',
        trim: true,
        width: commitRules.bodyMaxLineLength
      };

      const head = answers.type + ': ' + answers.subject;

      const body = wrap(answers.body, wrapOptions);
      const breaking = wrap(answers.breaking, wrapOptions);
      const footer = wrap(answers.footer, wrapOptions);

      let msg;

      msg = head;

      if (body) {
        msg += '\n\n' + body;
      }

      if (breaking) {
        msg += '\n\nBREAKING CHANGE: ' + breaking;
      }

      if (footer) {
        msg += '\n\nIssues: ' + footer;
      }

      return commit(msg);
    });
  }
};

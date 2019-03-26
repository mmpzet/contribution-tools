const chalk = require('chalk');
const operators = require('rxjs/operators');
const Base = require('inquirer/lib/prompts/base');
const observe = require('inquirer/lib/utils/events');

class LimitedInput extends Base {
  constructor (...args) {
    super(...args);

    if (!this.opt.maxLength) {
      this.throwParamError('maxLength');
    }

    this.originalMessage = this.opt.message;

    if (this.opt.leadingLabel) {
      if (typeof this.opt.leadingLabel === 'function') {
        this.leadingLabel = this.opt.leadingLabel(this.answers);
      } else {
        this.leadingLabel = this.opt.leadingLabel;
      }
    } else {
      this.leadingLabel = '';
    }

    this.leadingLength = this.leadingLabel.length;
  }

  // eslint-disable-next-line promise/prefer-await-to-callbacks
  _run (cb) {
    this.done = cb;

    // Once user confirm (enter key)
    const events = observe(this.rl);

    const submit = events.line.pipe(operators.map(this.filterInput.bind(this)));

    const validation = this.handleSubmitEvents(submit);

    validation.success.forEach(this.onEnd.bind(this));
    validation.error.forEach(this.onError.bind(this));

    events.keypress
      .pipe(operators.takeUntil(validation.success))
      .forEach(this.onKeypress.bind(this));

    // Init
    this.render();

    return this;
  }

  render (error) {
    let bottomContent = '';
    let message = this.getQuestion();

    if (this.status === 'answered') {
      message += chalk.cyan(this.answer);
    } else {
      message += this.getMessageGuide();
      message += this.getMessageInput();
    }

    if (error) {
      bottomContent = chalk.red('>> ') + error;
    }

    this.screen.render(message, bottomContent);
  }

  filterInput (input) {
    if (!input) {
      // eslint-disable-next-line no-eq-null, eqeqeq
      return this.opt.default == null ? '' : this.opt.default;
    }

    return input;
  }

  onEnd (state) {
    this.answer = state.value;
    this.status = 'answered';

    // Re-render prompt
    this.render();

    this.screen.done();
    this.done(state.value);
  }

  onError (state) {
    this.render(state.isValid);
  }

  onKeypress () {
    if (this.rl.line.length > this.opt.maxLength - this.leadingLength) {
      this.rl.line = this.rl.line.slice(0, this.opt.maxLength - this.leadingLength);
      this.rl.cursor--;
    }

    this.render();
  }

  getMessageGuide () {
    const remainingChars = this.opt.maxLength - this.leadingLength - this.rl.line.length;
    const usedChars = this.opt.maxLength - remainingChars;
    const progressMessage = `${remainingChars} remaining chars`;
    let progressBar = '';

    if (remainingChars > 0) {
      progressBar = chalk.cyan('-'.repeat(usedChars)) + '-'.repeat(remainingChars);
    } else {
      progressBar = chalk.red('-'.repeat(usedChars));
    }

    return `\n[${progressBar}] ${chalk.bold(progressMessage)}`;
  }

  getMessageInput () {
    return `\n ${chalk.bold(this.leadingLabel)}${this.rl.line}`;
  }
}

module.exports = LimitedInput;

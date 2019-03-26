# Contributing

We are open to, and grateful for, any contributions made by the community. By contributing to a MMPZET projects, you agree to abide by the [code of conduct](https://github.com/mmpetz/contribution-tools/blob/master/CODE_OF_CONDUCT.md).

## Reporting Issues and Asking Questions

Before opening an issue, please search the [issue tracker](https://github.com/mmpetz/contribution-tools/issues) to make sure your issue hasn't already been reported.

### Bugs and Improvements

We use the issue tracker to keep track of bugs and improvements to the project itself, its examples, and the documentation. We encourage you to open issues to discuss improvements, architecture, theory, internal implementation, etc. If a topic has been discussed before, we will ask you to join the previous discussion.

As this is stable software, changes to its behavior are very carefully considered. Any pull requests that involve breaking changes should be made against the `next` branch.

## Development

Visit the [issue tracker](https://github.com/mmpetz/contribution-tools/issues) to find a list of open issues that need attention.

Fork, then clone the repo:

```sh
git clone https://github.com/<your-username>/contribution-tools.git
```

### Building

### Testing and Linting

To only run linting:

```sh
npm run lint
```

To only run tests:

```sh
npm run test
```

To continuously watch and run tests, run the following:

```sh
npm run test -- --watch
```

### Docs

Improvements to the documentation are always welcome. In the docs we abide by typographic rules, so instead of ' you should use '. Same goes for “ ” and dashes (—) where appropriate. These rules only apply to the text, not to code blocks.

The docs are published automatically when the `master` branch is updated.


### Sending a Pull Request

For non-trivial changes, please open an issue with a proposal for a new feature or refactoring before starting on the work. We don't want you to waste your efforts on a pull request that we won't want to accept.

On the other hand, sometimes the best way to start a conversation _is_ to send a pull request. Use your best judgement!

In general, the contribution workflow looks like this:

- Read the [code of conduct](https://github.com/mmpetz/contribution-tools/blob/master/CODE_OF_CONDUCT.md).
- Open a new issue in the [Issue tracker](https://github.com/mmpetz/contribution-tools/issues).
- Fork the repo.
- Create a new feature branch based off the `master` branch.
- Make sure all tests pass and there are no linting errors.
- Commit your changes following the commit message convention and referencing any issues it addresses.
- Submit a pull request.
- If it's your first PR, please ensure you accept our CLA.

Please try to keep your pull request focused in scope and avoid including unrelated commits.

After you have submitted your pull request, we'll try to get back to you as soon as possible. We may suggest some changes or improvements.

Thank you for contributing!
# contribution-tools <img src="https://mmpzet.github.io/contribution-tools/logo.svg" align="right" width=128 />
> Collection of tools and configurations used for development and release of @mmpzet projects

## Installation

To install the package run
```bash
npm install --save-dev @mmpzet/contribution-tools
```

### commitlint

Install it in your project using

```bash
npm install --save-dev commitlint
```

and add the following configuration to your package.json
```json
"commitlint": {
  "extends": [
    "@mmpzet/contribution-tools/commitlint"
  ]
}
```

### lint-staged

In order to lint efficiently we use [lint-staged](https://github.com/okonet/lint-staged) that lints only the currently git staged files.

Install it in your project using

```bash
npm install --save-dev lint-staged
```

and add the following configuration to your package.json
```json
"lint-staged": {
  "*.js": [
    "eslint --fix",
    "git add"
  ]
}
```

### husky

To setup and manage git hooks we use [husky](https://github.com/typicode/husky).

Install it in your project using
```bash
npm install --save-dev husky
```

and add the following configuration to your package.json
```json
"husky": {
  "hooks": {
    "commit-msg": "commitlint -e $HUSKY_GIT_PARAMS",
    "pre-commit": "lint-staged",
    "pre-push": "npm run test"
  }
}
```

### commitizen

To easily write commit message that follow the guidelines we use [commitizen](https://github.com/commitizen/cz-cli)

Install it globally using
```bash
npm i -g commitizen
```

and configure it for the current project by executing

```bash
commitizen init @mmpzet/contribution-tools/commitizen --save-exact
```

### semantic-release

To release we use [semantic-release](https://github.com/semantic-release/semantic-release) that takes care of bumping the package version according to the semantic of the commits and of generating and publishing the release changelog.

Install it in your project using
```bash
npm install --save-dev semantic-release
```

and add the following configuration to your package.json
```json
"release": {
  "extends": "@mmpzet/contribution-tools/semantic-release"
},
"repository": {
  "type": "git",
  "url": "<path to your project https git url>"
}
```

### TL;DR:

run
```bash
npm i -g commitizen
npm install --save-dev semantic-release commitlint lint-staged husky @mmpzet/contribution-tools
commitizen init @mmpzet/contribution-tools/commitizen --save-exact
```

and add the following to your package.json
```json
"release": {
  "extends": "@mmpzet/contribution-tools/semantic-release"
},
"repository": {
  "type": "git",
  "url": "<path to your project https git url>"
},
"husky": {
  "hooks": {
    "commit-msg": "commitlint -e $HUSKY_GIT_PARAMS",
    "pre-commit": "lint-staged",
    "pre-push": "npm run test"
  }
},
"commitlint": {
  "extends": [
    "@mmpzet/contribution-tools/commitlint"
  ]
},
"lint-staged": {
  "*.js": [
    "eslint --fix",
    "git add"
  ]
}
```


Thanks.

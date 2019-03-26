const path = require('path');
const readFile = require('../../../utils/readFile');
const commitTypes = require('../../../shared/commitTypes');
const parserOpts = require('../../../shared/parserOpts');

const commitTypesMap = commitTypes.reduce((map, entry) => {
  map[entry.type] = entry;

  return map;
}, {});

const writerOpts = {
  transform (commit, context) {
    const issues = [];
    let url = context.repository ? `${context.host}/${context.owner}/${context.repository}` : context.repoUrl;

    if (url) {
      url = `${url}/issues/`;
    }

    commit.notes.forEach((note) => {
      note.title = 'BREAKING CHANGES';
    });

    const commitType = commitTypesMap[commit.type];

    if (commitType) {
      commit.label = commitType.label;
      commit.changelogOrder = commitType.changelogOrder;
    } else {
      return null;
    }

    if (typeof commit.hash === 'string') {
      commit.hash = commit.hash.substring(0, 7);
    }

    if (typeof commit.subject === 'string') {
      if (url) {
        // Issue URLs.
        commit.subject = commit.subject.replace(/#(\d+)/g, (_, issue) => {
          issues.push(issue);

          return `[#${issue}](${url}${issue})`;
        });
      }
      if (context.host) {
        // User URLs.
        commit.subject = commit.subject.replace(/\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g, (_, username) => {
          if (username.includes('/')) {
            return `@${username}`;
          }

          return `[@${username}](${context.host}/${username})`;
        });
      }
    }

    // remove references that already appear in the subject
    commit.references = commit.references.filter((reference) => {
      if (issues.indexOf(reference.issue) === -1) {
        return true;
      }

      return false;
    });

    commit.references.forEach((reference) => {
      reference.link = url ? `[#${reference.issue}](${url}${reference.issue})` : `#${reference.issue}`;
    });

    return commit;
  },
  groupBy: 'label',
  commitsSort: ['subject'],
  noteGroupsSort: 'title',
  commitGroupsSort (groupA, groupB) {
    return groupB.commits[0].changelogOrder - groupA.commits[0].changelogOrder;
  },

  notesSort (noteA, noteB) {
    return noteA.text > noteB.text ? 1 : -1;
  }
};

module.exports = Promise.all([
  readFile(path.resolve(__dirname, 'templates/template.hbs'), 'utf-8'),
  readFile(path.resolve(__dirname, 'templates/commit.hbs'), 'utf-8'),
  readFile(path.resolve(__dirname, 'templates/footer.hbs'), 'utf-8')
]).then(([template, commit, footer]) => {
  writerOpts.mainTemplate = template;
  writerOpts.commitPartial = commit;
  writerOpts.footerPartial = footer;

  return {
    parserOpts,
    writerOpts
  };
});

module.exports.writerOpts = writerOpts;

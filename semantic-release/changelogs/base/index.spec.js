/* eslint-disable promise/always-return, promise/catch-or-return,  max-nested-callbacks */
const commitTypes = require('../../../shared/commitTypes');
const conventionalChangelogBase = require('.');

const writerOpts = conventionalChangelogBase.writerOpts;

const commit = {
  notes: [],
  label: '',
  title: '',
  hash: 'da39a3ee5e6b4b0d3255bfef95601890afd80709',
  subject: 'subject',
  footer: '',
  scope: '',
  references: [],
  type: 'test'
};

const context = {
  host: 'https://github.com',
  owner: 'mmpzet',
  repository: 'contribution-tools'
};

const callTransform = (commitOverrides, contextOverrides) => writerOpts.transform({
  ...commit,
  ...commitOverrides
}, {
  ...context,
  ...contextOverrides
});

describe('conventional-changelog-base', () => {
  describe('writerOpts', () => {
    it('should transform commit', () => {
      const output = callTransform();

      expect(output).toMatchSnapshot();
    });

    it('should set note title to BREAKING CHANGES', () => {
      const output = callTransform({
        notes: [
          {
            title: 'This is a title',
            text: 'Changes to API'
          }
        ]
      });

      expect(output.notes[0].title).toEqual('BREAKING CHANGES');
    });

    it('should return null if commit type is not one of the predefined types', () => {
      const output = callTransform({
        type: 'styling'
      });

      expect(output).toEqual(null);
    });

    it('should add label and changelogOrder to the commit', () => {
      commitTypes.forEach((commitType) => {
        const output = callTransform({
          type: commitType.type
        });

        expect(output.label).toEqual(commitType.label);
        expect(output.changelogOrder).toEqual(commitType.changelogOrder);
      });
    });

    it('should add a link to github tickets in commit subject ', () => {
      ['#123', '#1'].forEach((ticket) => {
        const output = callTransform({
          subject: `feat: add new accordion for ${ticket}`
        });
        const issue = ticket.replace('#', '');

        expect(output.subject).toContain(`[${ticket}](${context.host}/mmpzet/contribution-tools/issues/${issue})`);
      });
    });

    it('should not add a link to unkown issues', () => {
      ['34789', 'ABC-999'].forEach((ticket) => {
        const output = callTransform({
          subject: `feat: add new accordion for ${ticket}`
        });

        expect(output.subject).not.toContain(`[${ticket}]`);
      });
    });

    it('should add github link to username in subject', () => {
      const output = callTransform({
        subject: 'refactor: iterator code as suggested by @john-kyle'
      });

      expect(output.subject).toContain(`[@john-kyle](${context.host}/john-kyle)`);
    });

    it('should add a github link to references', () => {
      const output = callTransform({
        references: [
          {
            action: 'Closes',
            owner: null,
            repository: null,
            issue: '123',
            raw: 'Closes: #123',
            prefix: '#'
          }
        ]
      });

      expect(output.references[0].link).toEqual(`[#123](${context.host}/${context.owner}/${context.repository}/issues/123)`);
    });

    it('should remove reference is already mentioned in the commit subject', () => {
      const output = callTransform({
        subject: 'feat: some fancy feature #999',
        references: [
          {
            action: 'Closes',
            owner: null,
            repository: null,
            issue: '999',
            raw: 'Closes: #999',
            prefix: '#'
          }
        ]
      });

      expect(output.references.length).toEqual(0);
    });

    it('should match the template snapshots', () => conventionalChangelogBase.then((exported) => {
      expect(exported.writerOpts.mainTemplate).toMatchSnapshot();
      expect(exported.writerOpts.commitPartial).toMatchSnapshot();
      expect(exported.writerOpts.footerPartial).toMatchSnapshot();
    }));
  });
});

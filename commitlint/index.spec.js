/* eslint-disable max-nested-callbacks */
const load = require('@commitlint/load');
const lint = require('@commitlint/lint');

describe('commitlint configuration', () => {
  it('should be a valid configuration', () => load({
    // commitlint extends path is always relative to project root
    extends: ['./commitlint']
  }));

  describe('loaded configuration', () => {
    let config;

    beforeAll(async () => {
      config = await load({
        // commitlint extends path is always relative to project root
        extends: ['./commitlint']
      });
    });

    it('should identify INVALID commit message', async () => {
      const invalidMessages = [
        'missing type',
        'invalid: invalid type',
        'feat:not spaced',
        'feat:',
        'feat: some very very very very very very very very very very very very very very very long text'
      ];

      await Promise.all(invalidMessages.map(async (message) => {
        const report = await lint(message, config.rules);

        report.message = message;

        // console.log(message, report)
        expect(report.valid).toBe(false);
        expect(report).toMatchSnapshot();
      }));
    });

    it('should identify VALID commit message', async () => {
      const validMesages = [
        'feat: some valid text'
      ];

      await Promise.all(validMesages.map(async (message) => {
        const report = await lint(message, config.rules);

        report.message = message;
        expect(report.valid).toBe(true);
        expect(report).toMatchSnapshot();
      }));
    });
  });
});

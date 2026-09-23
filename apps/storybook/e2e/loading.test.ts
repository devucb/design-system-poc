import {launchStory} from './launchStory';

describe('Loading', () => {
  beforeAll(async () => {
    await launchStory('loading', 'loading');
  });

  it('shows the spinner', async () => {
    await expect(element(by.id('loading'))).toBeVisible();
  });
});

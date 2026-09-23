import {launchStory} from './launchStory';

describe('Dots', () => {
  beforeAll(async () => {
    await launchStory('dots', 'dots');
  });

  it('shows the stepper dots', async () => {
    await expect(element(by.id('dots'))).toBeVisible();
  });
});

import {launchStory} from './launchStory';

describe('Select', () => {
  beforeAll(async () => {
    await launchStory('select', 'select');
  });

  it('opens the sheet and picks an option', async () => {
    await element(by.id('select')).tap();
    await waitFor(element(by.id('select-option-ank')))
      .toBeVisible()
      .withTimeout(5000);
    await element(by.id('select-option-ank')).tap();
    await expect(element(by.text('Ankara'))).toBeVisible();
  });
});

const DEMO_EMAIL = 'demo@example.com';
const DEMO_PASSWORD = 'demo';
const GRAPHQL_URL = process.env.GRAPHQL_URL ?? 'http://localhost:4000/graphql';

async function waitForBff() {
  const deadline = Date.now() + 30000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query: '{ health { status } }'}),
      });
      const body = await response.json();
      if (body?.data?.health?.status === 'ok') {
        return;
      }
    } catch {
      // BFF is still compiling or not bound yet.
    }
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  throw new Error('BFF is not reachable at ' + GRAPHQL_URL);
}

describe('Splash login home', () => {
  beforeAll(async () => {
    await waitForBff();
    await device.launchApp({
      newInstance: true,
      delete: true,
      launchArgs: {
        detoxEnableSynchronization: 0,
        detoxSplashMs: 8000,
      },
    });
    await device.disableSynchronization();
  });

  it('shows splash, signs in with the demo user, and lands on home', async () => {
    await waitFor(element(by.id('splash')))
      .toBeVisible()
      .withTimeout(60000);

    await waitFor(element(by.id('login')))
      .toBeVisible()
      .withTimeout(15000);
    await device.takeScreenshot('login');
    await element(by.id('login-email')).replaceText(DEMO_EMAIL);
    await device.takeScreenshot('login-email');
    await element(by.id('login-password')).replaceText(DEMO_PASSWORD);
    await device.takeScreenshot('login-password');
    await element(by.id('login-submit')).tap();
    await device.takeScreenshot('login-submit');
    await waitFor(element(by.id('hud')))
      .toBeVisible()
      .withTimeout(5000);
    await waitFor(element(by.id('home')))
      .toBeVisible()
      .withTimeout(15000);
    await device.takeScreenshot('home');
  });
});

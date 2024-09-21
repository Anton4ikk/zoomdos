const { test, chromium } = require('@playwright/test');
const { users, zoomLink, zoomDuration } = require('../config/index');

for (let user of users) {
  test(`Enter zoom meeting by ${user}`, async () => {
    const browser = await chromium.launch({
      args: [
        '--mute-audio',
      ]
    });
    const browserContext = await browser.newContext();
    let page = await browserContext.newPage();
    await page.goto(zoomLink, { waitUntil: "commit" });
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Accept Cookies' }).click();
    await page.waitForTimeout(16 * 1000);
    await page.getByRole('button', { name: 'Launch Meeting' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Join from your browser' }).click();
    await page.waitForTimeout(Math.floor(Math.random() * 180) * 1000);
    page = browserContext.pages()[0];
    await page.goto(page.url(), { waitUntil: "commit" });
    await page.waitForTimeout(8 * 1000);
    await page.frameLocator('#webclient').getByLabel('Your Name').fill(user);
    await page.waitForTimeout(2000);
    await page.frameLocator('#webclient').getByRole('button', { name: 'Join', exact: true }).click();
    await page.waitForTimeout(16 * 1000);
    await page.frameLocator('#webclient').getByRole('button', { name: 'Join Audio by Computer' }).click();
    await page.waitForTimeout(zoomDuration * 1.2 * 60 * 1000);
  });
}

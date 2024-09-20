const { defineConfig, devices } = require('@playwright/test');
const { zoomDuration } = require('./config/index');

module.exports = defineConfig({
  testDir: './script',
  fullyParallel: false,
  forbidOnly: false,
  retries: 0,
  workers: 1,
  timeout: zoomDuration * 1.2 * 60 * 1000,
  reporter: 'line',
  use: {
    actionTimeout: 30 * 1000,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});


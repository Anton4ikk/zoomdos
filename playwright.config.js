const { defineConfig, devices } = require('@playwright/test');
const { users, zoomDuration } = require('./config/index');

module.exports = defineConfig({
  testDir: './script',
  fullyParallel: true,
  forbidOnly: false,
  retries: 0,
  workers: users.length,
  timeout: zoomDuration * 1.3 * 60 * 1000,
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


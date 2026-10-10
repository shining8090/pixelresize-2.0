const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 45000,
  expect: { timeout: 10000 },
  use: {
    baseURL: 'http://127.0.0.1:8000',
    browserName: 'chromium',
    headless: true,
    acceptDownloads: true
  },
  reporter: 'line'
});

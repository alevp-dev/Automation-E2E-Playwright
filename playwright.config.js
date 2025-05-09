const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
    testDir: './tests',
    timeout: 30000,
    expect: {
        timeout: 30000,
    },
    use: {
        headless: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        baseURL: 'https://www.saucedemo.com/',
    },
    projects: [
        { name: 'chromium', use: { browserName: 'chromium' } },
        { name: 'firefox', use: { browserName: 'firefox' } },
        // { name: 'webkit', use: { browserName: 'webkit' } },
    ],
    reporter: [['html', { outputFolder: 'playwright-report' }]],
});
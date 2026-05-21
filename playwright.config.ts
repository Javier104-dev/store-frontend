import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './playwright',
	testMatch: '**/tests/**/*.spec.ts',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: [['list'], ['html']],
	use: {
		baseURL: `http://127.0.0.1:${process.env.PORT || 3000}`,
		trace: 'on-first-retry',
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
		{
			name: 'mobile',
			use: {
				viewport: { width: 375, height: 667 },
			},
		},
	],
	webServer: {
		command: 'npm run start:test',
		url: `http://localhost:${process.env.PORT || 3000}`,
		reuseExistingServer: !process.env.CI,
		stdout: 'ignore',
		stderr: 'pipe',
	},
});

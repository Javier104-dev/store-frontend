import type { Page } from '@playwright/test';
import { test as base, expect } from 'playwright-test-coverage';

import { loadMock } from './loadMocks';

import {
	CODE_MIN_LENGTH,
	CODE_REQUIRED,
	CODE_TYPE,
	PASSWORD_LOWERCASE,
	PASSWORD_MIN_LENGTH,
	PASSWORD_NUMBER,
	PASSWORD_REQUIRED,
	PASSWORD_SPECIAL,
	PASSWORD_UPPERCASE,
	USERNAME_INVALID,
	USERNAME_REQUIRED,
} from '@pages/auth/schemas/schema-errors';

export const test = base.extend<{
	getBySel: (selector: string) => ReturnType<Page['locator']>;
	signIn: () => Promise<void>;
	validateUsername: (
		inputSelector: string,
		errorSelector: string,
	) => Promise<void>;
	validatePassword: (
		inputSelector: string,
		errorSelector: string,
	) => Promise<void>;
	validateCode: (inputSelector: string, errorSelector: string) => Promise<void>;
}>({
	getBySel: async ({ page }, apply) => {
		const getBySel = (selector: string) =>
			page.locator(`[data-test="${selector}"]`);
		await apply(getBySel);
	},

	signIn: async ({ page }, apply) => {
		const signIn = async () => {
			await page.route('**/api/v1/auth/sign-in', async (route) => {
				await route.fulfill({
					json: loadMock('auth/sign-in.json'),
				});
			});

			await page.goto('/auth/sign-in');

			await page.fill('[data-test="sign-in-username"]', '_test@biggertech.co');
			await page.fill('[data-test="sign-in-password"]', 'Password123');
			await page.click('[data-test="sign-in-submit"]');

			await page.waitForURL('/**');
		};

		await apply(signIn);
	},

	validateUsername: async ({ page }, apply) => {
		const validateUsername = async (
			inputSelector: string,
			errorSelector: string,
		) => {
			const username = '_test@biggertech.co';
			const badUsername = 'someusername';

			await page.locator(`[data-test="${inputSelector}"]`).focus();
			await page.locator(`[data-test="${inputSelector}"]`).blur();
			await expect(
				page.locator(`[data-test="${errorSelector}"]`),
			).toContainText(USERNAME_REQUIRED);

			await page.locator(`[data-test="${inputSelector}"]`).fill(badUsername);
			await page.locator(`[data-test="${inputSelector}"]`).blur();
			await expect(
				page.locator(`[data-test="${errorSelector}"]`),
			).toContainText(USERNAME_INVALID);

			await page.locator(`[data-test="${inputSelector}"]`).fill(username);
			await page.locator(`[data-test="${inputSelector}"]`).blur();
		};

		await apply(validateUsername);
	},

	validatePassword: async ({ page }, apply) => {
		const validatePassword = async (
			inputSelector: string,
			errorSelector: string,
		) => {
			const shortPassword = 'some';
			const uppercaseErrorPassword = '@@1secret';
			const lowercaseErrorPassword = '@1SECRET';
			const noSymbolPassword = '11Secret';
			const noNumberPassword = '@@Secret';

			await page.locator(`[data-test="${inputSelector}"]`).focus();
			await page.locator(`[data-test="${inputSelector}"]`).blur();
			await expect(
				page.locator(`[data-test="${errorSelector}"]`),
			).toContainText(PASSWORD_REQUIRED);

			await page.locator(`[data-test="${inputSelector}"]`).fill(shortPassword);
			await page.locator(`[data-test="${inputSelector}"]`).blur();
			await expect(
				page.locator(`[data-test="${errorSelector}"]`),
			).toContainText(PASSWORD_MIN_LENGTH);

			await page
				.locator(`[data-test="${inputSelector}"]`)
				.fill(lowercaseErrorPassword);
			await page.locator(`[data-test="${inputSelector}"]`).blur();
			await expect(
				page.locator(`[data-test="${errorSelector}"]`),
			).toContainText(PASSWORD_LOWERCASE);

			await page
				.locator(`[data-test="${inputSelector}"]`)
				.fill(uppercaseErrorPassword);
			await page.locator(`[data-test="${inputSelector}"]`).blur();
			await expect(
				page.locator(`[data-test="${errorSelector}"]`),
			).toContainText(PASSWORD_UPPERCASE);

			await page
				.locator(`[data-test="${inputSelector}"]`)
				.fill(noSymbolPassword);
			await page.locator(`[data-test="${inputSelector}"]`).blur();
			await expect(
				page.locator(`[data-test="${errorSelector}"]`),
			).toContainText(PASSWORD_SPECIAL);

			await page
				.locator(`[data-test="${inputSelector}"]`)
				.fill(noNumberPassword);
			await page.locator(`[data-test="${inputSelector}"]`).blur();
			await expect(
				page.locator(`[data-test="${errorSelector}"]`),
			).toContainText(PASSWORD_NUMBER);
		};

		await apply(validatePassword);
	},

	validateCode: async ({ page }, apply) => {
		const validateCode = async (
			inputSelector: string,
			errorSelector: string,
		) => {
			await page.locator(`[data-test="${inputSelector}"]`).focus();
			await page.locator(`[data-test="${inputSelector}"]`).blur();
			await expect(
				page.locator(`[data-test="${errorSelector}"]`),
			).toContainText(CODE_REQUIRED);

			await page.locator(`[data-test="${inputSelector}"]`).fill('12345');
			await page.locator(`[data-test="${inputSelector}"]`).blur();
			await expect(
				page.locator(`[data-test="${errorSelector}"]`),
			).toContainText(CODE_MIN_LENGTH);

			await page.locator(`[data-test="${inputSelector}"]`).fill('aaa');
			await page.locator(`[data-test="${inputSelector}"]`).blur();
			await expect(
				page.locator(`[data-test="${errorSelector}"]`),
			).toContainText(CODE_TYPE);
		};

		await apply(validateCode);
	},
});

export { expect } from 'playwright-test-coverage';

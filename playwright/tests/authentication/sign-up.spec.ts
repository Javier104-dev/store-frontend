import { expect, test } from '../../utils/baseFixture';
import { loadMock } from '../../utils/loadMocks';

import {
	CONFIRMATION_SENT_MESSAGE,
	SIGN_UP_SUCCESS_MESSAGE,
} from '@pages/auth/context/auth-messages';

const username = '_test@biggertech.co';
const password = 'Supersecret2024~';

test.describe('/auth/sign-up', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/auth/sign-up');
	});

	test('should be able to sign-up', async ({ page, getBySel }) => {
		await getBySel('sign-up-username').fill(username);
		await getBySel('sign-up-password').fill(password);

		await page.route('**/auth/sign-up', async (route) => {
			await route.fulfill({
				json: loadMock('auth/sign-up.json'),
			});
		});

		await getBySel('sign-up-submit').click();
		await expect(getBySel('toast-container')).toContainText(
			SIGN_UP_SUCCESS_MESSAGE,
		);
		await expect(getBySel('toast-container')).toContainText(
			CONFIRMATION_SENT_MESSAGE,
		);
	});

	test('should be able to visit sign-in', async ({ page }) => {
		await page.click('[data-test="link-sign-in"]');
		await expect(page).toHaveURL('/auth/sign-in');
	});

	test('should validate username field', async ({ validateUsername }) => {
		await validateUsername('sign-up-username', 'form-input-error-username');
	});

	test('should validate password field', async ({ validatePassword }) => {
		await validatePassword('sign-up-password', 'form-input-error-password');
	});

	test('should render super admin message if there are no users', async ({
		page,
	}) => {
		await page.route('**/user/count', async (route) => {
			await route.fulfill({
				json: loadMock('user/users-count-empty.json'),
			});
		});

		await page.goto('/auth/sign-up');
		await expect(page.locator('text=Create super admin')).toBeVisible();
	});

	test('should show an error if the user already exists', async ({
		page,
		getBySel,
	}) => {
		const errorResponse = {
			error: {
				detail: `${username} already exists`,
				source: { pointer: '/api/v1/auth/sign-up' },
				status: '409',
				title: 'Conflict',
			},
		};

		await getBySel('sign-up-username').fill(username);
		await getBySel('sign-up-password').fill(password);

		await page.route('**/auth/sign-up', async (route) => {
			await route.fulfill({
				status: Number.parseInt(errorResponse.error.status),
				body: JSON.stringify(errorResponse),
			});
		});

		await getBySel('sign-up-submit').click();

		await expect(getBySel('toast-container')).toContainText(
			errorResponse.error.detail,
		);
	});
});

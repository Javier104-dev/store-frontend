import { expect, test } from '../../utils/baseFixture';
import { loadMock } from '../../utils/loadMocks';

import { SIGN_IN_SUCCESS_MESSAGE } from '@pages/auth/context/auth-messages';
import { PASSWORD_REQUIRED } from '@pages/auth/schemas/schema-errors';

const username = '_test@biggertech.co';
const password = 'Supersecret2024~';

test.describe('/auth/sign-in', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/auth/sign-in');
	});

	test('should be able to access the sign-in page', async ({
		page,
		getBySel,
	}) => {
		await page.goto('/');
		await getBySel('sign-in').click();
		await expect(page).toHaveURL('/auth/sign-in');
	});

	test('should redirect admin user to /store', async ({ page, signIn }) => {
		await page.route('**/api/v1/user/me', async (route) => {
			await route.fulfill({
				json: loadMock('user/admin-user.json'),
			});
		});

		await page.route('**/api/v1/store/owner', async (route) => {
			await route.fulfill({
				json: loadMock('store/store-from-owner.json'),
			});
		});

		await signIn();

		await expect(page.locator('[data-test="toast-container"]')).toContainText(
			SIGN_IN_SUCCESS_MESSAGE,
		);

		await expect(page).toHaveURL('/store/products');
	});

	test('should redirect regular user to /', async ({ page, signIn }) => {
		await page.route('**/api/v1/user/me', async (route) => {
			await route.fulfill({
				json: loadMock('user/regular-user.json'),
			});
		});

		await signIn();
		await expect(page.locator('[data-test="toast-container"]')).toContainText(
			SIGN_IN_SUCCESS_MESSAGE,
		);
		await expect(page).toHaveURL('/');
	});

	test('should be able to visit sign-up', async ({ page }) => {
		await page.click('[data-test="link-sign-up"]');
		await expect(page).toHaveURL('/auth/sign-up');
	});

	test('should be able to visit forgot password', async ({ page }) => {
		await page.click('[data-test="link-forgot-password"]');
		await expect(page).toHaveURL('/auth/forgot-password');
	});

	test('should be able to visit confirm user', async ({ page }) => {
		await page.click('[data-test="link-confirm-user"]');
		await expect(page).toHaveURL('/auth/confirm-user');
	});

	test('should validate username field', async ({ validateUsername }) => {
		await validateUsername('sign-in-username', 'form-input-error-username');
	});

	test('should validate password field', async ({ getBySel }) => {
		await getBySel('sign-in-password').focus();
		await getBySel('sign-in-password').blur();
		await expect(getBySel('form-input-error-password')).toContainText(
			PASSWORD_REQUIRED,
		);
	});

	test('should show an error if the user does not exist', async ({
		page,
		getBySel,
	}) => {
		const errorResponse = {
			error: {
				detail: `${username} was not found`,
				source: { pointer: '/api/v1/auth/sign-in' },
				status: '404',
				title: 'Username Not Found',
			},
		};

		await getBySel('sign-in-username').fill(username);
		await getBySel('sign-in-password').fill(password);

		await page.route('**/auth/sign-in', async (route) => {
			await route.fulfill({
				status: Number.parseInt(errorResponse.error.status),
				body: JSON.stringify(errorResponse),
			});
		});

		await getBySel('sign-in-submit').click();

		await expect(getBySel('toast-container')).toContainText(
			errorResponse.error.detail,
		);
	});

	test('should show an error if the password is incorrect', async ({
		page,
		getBySel,
	}) => {
		const errorResponse = {
			error: {
				detail: 'Invalid username or password',
				source: { pointer: '/api/v1/auth/sign-in' },
				status: '401',
				title: 'Unauthorized',
			},
		};

		await getBySel('sign-in-username').fill(username);
		await getBySel('sign-in-password').fill(password);

		await page.route('**/auth/sign-in', async (route) => {
			await route.fulfill({
				status: Number.parseInt(errorResponse.error.status),
				body: JSON.stringify(errorResponse),
			});
		});

		await getBySel('sign-in-submit').click();

		await expect(getBySel('toast-container')).toContainText(
			errorResponse.error.detail,
		);
	});
});

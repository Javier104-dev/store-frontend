import { expect, test } from '../../utils/baseFixture';

const username = '_test@biggertech.co';
const password = 'Supersecret2024~';
const code = '123456';

test.describe('/auth/confirm-password', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/auth/confirm-password');
	});

	const successResponse = {
		data: {
			attributes: {
				message: 'Password reset successfully',
				status: '200',
			},
		},
	};

	test('should be able to use the confirm password form', async ({
		page,
		getBySel,
	}) => {
		await getBySel('confirm-password-username').fill(username);
		await getBySel('confirm-password-password').fill(password);
		await getBySel('confirm-password-code').fill(code);

		await page.route('**/auth/confirm-password', async (route) => {
			await route.fulfill({
				body: JSON.stringify(successResponse),
			});
		});

		await getBySel('confirm-password-submit').click();

		await expect(getBySel('toast-container')).toContainText(
			successResponse.data.attributes.message,
		);
	});

	test('should be able to visit forgot password', async ({ page }) => {
		await page.click('[data-test="link-forgot-password"]');
		await expect(page).toHaveURL('/auth/forgot-password');
	});

	test('should be able to visit sign in', async ({ page }) => {
		await page.click('[data-test="link-sign-in"]');
		await expect(page).toHaveURL('/auth/sign-in');
	});

	test('should validate username field', async ({ validateUsername }) => {
		await validateUsername(
			'confirm-password-username',
			'form-input-error-username',
		);
	});

	test('should validate password field', async ({ validatePassword }) => {
		await validatePassword(
			'confirm-password-password',
			'form-input-error-password',
		);
	});

	test('should validate code field', async ({ validateCode }) => {
		await validateCode('confirm-password-code', 'form-input-error-code');
	});

	test('should show an error if the user does not exist', async ({
		page,
		getBySel,
	}) => {
		const errorResponse = {
			error: {
				detail: `${username} was not found`,
				source: { pointer: '/api/v1/auth/confirm-password' },
				status: '404',
				title: 'Username Not Found',
			},
		};

		await getBySel('confirm-password-username').fill(username);
		await getBySel('confirm-password-password').fill(password);
		await getBySel('confirm-password-code').fill(code);

		await page.route('**/auth/confirm-password', async (route) => {
			await route.fulfill({
				status: parseInt(errorResponse.error.status),
				body: JSON.stringify(errorResponse),
			});
		});

		await getBySel('confirm-password-submit').click();

		await expect(getBySel('toast-container')).toContainText(
			errorResponse.error.detail,
		);
	});

	test('should show an error if the code is invalid', async ({
		page,
		getBySel,
	}) => {
		const errorResponse = {
			error: {
				detail: 'Incorrect confirmation code',
				source: { pointer: '/api/v1/auth/confirm-password' },
				status: '400',
				title: 'Bad Request',
			},
		};

		await getBySel('confirm-password-username').fill(username);
		await getBySel('confirm-password-password').fill(password);
		await getBySel('confirm-password-code').fill(code);

		await page.route('**/auth/confirm-password', async (route) => {
			await route.fulfill({
				status: parseInt(errorResponse.error.status),
				body: JSON.stringify(errorResponse),
			});
		});

		await getBySel('confirm-password-submit').click();

		await expect(getBySel('toast-container')).toContainText(
			errorResponse.error.detail,
		);
	});
});

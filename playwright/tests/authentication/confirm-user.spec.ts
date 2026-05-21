import { expect, test } from '../../utils/baseFixture';

const username = '_test@biggertech.co';
const code = '123456';

test.describe('/auth/confirm-user', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/auth/confirm-user');
	});

	const successResponse = {
		data: {
			attributes: {
				message: 'User confirmed successfully',
				status: '200',
			},
		},
	};

	test('should be able to use the confirm user form', async ({
		page,
		getBySel,
	}) => {
		await getBySel('confirm-user-username').fill(username);
		await getBySel('confirm-user-code').fill(code);

		await page.route('**/auth/confirm-user', async (route) => {
			await route.fulfill({
				body: JSON.stringify(successResponse),
			});
		});

		await getBySel('confirm-user-submit').click();

		await expect(getBySel('toast-container')).toContainText(
			successResponse.data.attributes.message,
		);
	});

	test('should auto confirm the user if a query link is used', async ({
		page,
		getBySel,
	}) => {
		await page.route('**/auth/confirm-user', async (route) => {
			await route.fulfill({
				body: JSON.stringify(successResponse),
			});
		});

		await page.goto(`/auth/confirm-user?username=${username}&code=${code}`);

		await expect(getBySel('toast-container')).toContainText(
			successResponse.data.attributes.message,
		);
	});

	test('should be able to visit resend confirmation code', async ({ page }) => {
		await page.click('[data-test="link-resend-confirmation-code"]');
		await expect(page).toHaveURL('/auth/resend-confirmation-code');
	});

	test('should be able to visit sign in', async ({ page }) => {
		await page.click('[data-test="link-sign-in"]');
		await expect(page).toHaveURL('/auth/sign-in');
	});

	test('should validate username field', async ({ validateUsername }) => {
		await validateUsername(
			'confirm-user-username',
			'form-input-error-username',
		);
	});

	test('should validate code field', async ({ validateCode }) => {
		await validateCode('confirm-user-code', 'form-input-error-code');
	});

	test('should show an error if the user does not exist', async ({
		page,
		getBySel,
	}) => {
		const errorResponse = {
			error: {
				detail: `${username} was not found`,
				source: { pointer: '/api/v1/auth/confirm-user' },
				status: '404',
				title: 'Username Not Found',
			},
		};

		await getBySel('confirm-user-username').fill(username);
		await getBySel('confirm-user-code').fill(code);

		await page.route('**/auth/confirm-user', async (route) => {
			await route.fulfill({
				status: parseInt(errorResponse.error.status),
				body: JSON.stringify(errorResponse),
			});
		});

		await getBySel('confirm-user-submit').click();

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
				source: { pointer: '/api/v1/auth/confirm-user' },
				status: '400',
				title: 'Bad Request',
			},
		};

		await getBySel('confirm-user-username').fill(username);
		await getBySel('confirm-user-code').fill(code);

		await page.route('**/auth/confirm-user', async (route) => {
			await route.fulfill({
				status: parseInt(errorResponse.error.status),
				body: JSON.stringify(errorResponse),
			});
		});

		await getBySel('confirm-user-submit').click();

		await expect(getBySel('toast-container')).toContainText(
			errorResponse.error.detail,
		);
	});
});

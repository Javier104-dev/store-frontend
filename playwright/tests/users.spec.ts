import { expect, test } from '../utils/baseFixture';
import { loadMock } from '../utils/loadMocks';

test.describe('Users Page', () => {
	test('should display loading state initially', async ({ page, getBySel }) => {
		await page.route(
			'https://jsonplaceholder.typicode.com/users',
			async (route) => {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				await route.fulfill({ json: loadMock('user/users.json') });
			},
		);

		await page.goto('/users');
		await expect(getBySel('loading-spinner')).toBeVisible();
	});

	test('should display users when API call is successful', async ({
		page,
		getBySel,
	}) => {
		await page.route(
			'https://jsonplaceholder.typicode.com/users',
			async (route) => {
				await route.fulfill({ json: loadMock('user/users.json') });
			},
		);

		await page.goto('/users');

		const usersList = getBySel('users-list');
		await expect(usersList).toBeVisible();

		const userCards = page.locator('[data-test="user-card"]');
		await expect(userCards).toHaveCount(2);
	});

	test('should display error message when API call fails', async ({
		page,
		getBySel,
	}) => {
		await page.route(
			'https://jsonplaceholder.typicode.com/users',
			async (route) => {
				await route.fulfill({
					status: 500,
					body: JSON.stringify({ message: 'Server error' }),
				});
			},
		);

		await page.goto('/users');
		await expect(getBySel('error-message')).toBeVisible();
	});
});

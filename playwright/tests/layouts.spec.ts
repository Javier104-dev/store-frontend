import { expect, test } from '../utils/baseFixture';

test.describe('Layouts', () => {
	test.describe('Private Layout', () => {
		test('should redirect to login when accessing private route without auth', async ({
			page,
		}) => {
			await page.goto('/about');
			await expect(page).toHaveURL('/auth/sign-in');
		});

		test('should allow access to private route when authenticated', async ({
			page,
			signIn,
		}) => {
			await signIn();
			await page.goto('/about');
			await expect(page).toHaveURL('/about');
		});
	});

	test.describe('Auth Layout', () => {
		test('should redirect to home page when accessing auth pages while authenticated', async ({
			page,
			signIn,
		}) => {
			await signIn();
			await page.goto('/auth/sign-in');
			await expect(page).toHaveURL('/');
		});

		test('should allow access to auth routes when not authenticated', async ({
			page,
		}) => {
			await page.goto('/auth/sign-in');
			await expect(page).toHaveURL('/auth/sign-in');
		});
	});

	test.describe('Public Layout', () => {
		test('should allow access to public routes when not authenticated', async ({
			page,
		}) => {
			await page.goto('/');
			await expect(page).toHaveURL('/');
		});

		test('should allow access to public routes when authenticated', async ({
			page,
			signIn,
		}) => {
			await signIn();
			await page.goto('/');
			await expect(page).toHaveURL('/');
		});

		test('should allow access to sign-out when authenticated', async ({
			page,
			signIn,
		}) => {
			await signIn();
			await page.goto('/auth/sign-out');
			await expect(page).toHaveURL('/');
		});
	});
});

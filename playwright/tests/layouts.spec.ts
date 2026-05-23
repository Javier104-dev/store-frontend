import { expect, test } from '../utils/baseFixture';
import { loadMock } from '../utils/loadMocks';

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

  test.describe('Store Layout', () => {
    test('should redirect to the store section if the user does not have a store created', async ({
      page,
      signIn,
    }) => {
      const errorResponse = {
        error: {
          status: '404',
          source: {
            pointer: '/api/v1/store/owner',
          },
          title: 'Store not found',
          detail: "This user doesn't have a store yet.",
        },
      };

      await page.route('**/api/v1/user/me', async (route) => {
        await route.fulfill({
          json: loadMock('user/admin-user.json'),
        });
      });
      await page.route('**/api/v1/store/owner', async (route) => {
        await route.fulfill({
          status: Number.parseInt(errorResponse.error.status),
          body: JSON.stringify(errorResponse),
        });
      });
      await signIn();
      await page.goto('/store/products');
      await expect(page).toHaveURL('/store');
    });

    test('should redirect to the manage products section if the user has a store created', async ({
      page,
      signIn,
    }) => {
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
      await expect(page).toHaveURL('/store/products');
    });
  });
});

import { expect, test } from '../../utils/baseFixture';
import { loadMock } from '../../utils/loadMocks';

import { HomeRoutes } from '@configs/router/HomeRoutes';
import { StoreRoutes } from '@configs/router/StoreRoutes';

test.describe('Logo navigation', () => {
  test('should redirect to home for regular user', async ({
    page,
    signIn,
    getBySel,
  }) => {
    await page.route('**/api/v1/user/me', async (route) => {
      await route.fulfill({
        json: loadMock('user/regular-user.json'),
      });
    });
    await signIn();

    await page.goto('/about');

    await getBySel('store-logo').click();
    await expect(page).toHaveURL(HomeRoutes.HOME);
  });

  test('should redirect to home for unauthenticated user', async ({
    page,
    getBySel,
  }) => {
    const productId = '9df03d81-70d1-408e-a00d-9d78962cf306';
    await page.route(`**/api/v1/product/${productId}`, async (route) => {
      await route.fulfill({
        json: loadMock('product/product-by-id.json'),
      });
    });

    const categoryId = 'd2614131-01c2-436a-9617-d94ccc46cacc';
    await page.route(
      `**/product?filter%5Bcategories%5D%5Bid%5D=${categoryId}`,
      async (route) => {
        await route.fulfill({
          json: loadMock('product/product-by-category-id.json'),
        });
      },
    );

    await page.goto(`/product/${productId}`);

    await getBySel('store-logo').click();
    await expect(page).toHaveURL(HomeRoutes.HOME);
  });

  test('should redirect to store products for admin user', async ({
    page,
    signIn,
    getBySel,
  }) => {
    await page.route('**/api/v1/user/me', async (route) => {
      await route.fulfill({
        json: loadMock('user/admin-user.json'),
      });
    });
    await signIn();

    await page.goto('/store');
    await getBySel('store-logo').click();
    await expect(page).toHaveURL(StoreRoutes.MANAGE_PRODUCTS);
  });
});

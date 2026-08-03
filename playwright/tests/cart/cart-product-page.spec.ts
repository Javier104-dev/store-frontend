import { expect, test } from '../../utils/baseFixture';
import { loadMock } from '../../utils/loadMocks';

test.describe('Cart product page', () => {
  test.beforeEach(async ({ signIn, page }) => {
    await page.route('**/api/v1/user/me', async (route) => {
      await route.fulfill({
        json: loadMock('user/regular-user.json'),
      });
    });
    await signIn();
  });

  test('should add an item to the cart from the product page', async ({
    page,
    getBySel,
  }) => {
    await page.route('**/api/v1/cart/user', async (route) => {
      await route.fulfill({
        json: loadMock('cart/empty-cart.json'),
      });
    });

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

    await getBySel('increase-quantity-button').click();
    await getBySel('increase-quantity-button').click();
    await getBySel('increase-quantity-button').click();

    await page.route('**/api/v1/cart/item', async (route) => {
      await route.fulfill({ status: 201 });
    });

    await page.route('**/api/v1/cart/user', async (route) => {
      await route.fulfill({
        json: loadMock('cart/add-cart-item-refetch.json'),
      });
    });

    await getBySel('add-to-cart-button').click();
    await expect(getBySel('cart-icon-count')).toHaveText('4');
    await getBySel('cart-icon').click();

    const cartItem = getBySel('cart-item-8c781229-a176-4135-a039-b18dbcc2bbf5');
    await expect(cartItem).toHaveCount(1);
    await expect(
      cartItem.locator('[data-test="cart-item-quantity"]'),
    ).toHaveText('4');

    await expect(getBySel('cart-drawer-subtotal')).toHaveText('$ 402.00');
  });

  test('should remove the item from the cart when adding it from the product page fails', async ({
    page,
    getBySel,
  }) => {
    await page.route('**/api/v1/cart/user', async (route) => {
      await route.fulfill({
        json: loadMock('cart/empty-cart.json'),
      });
    });

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

    await getBySel('increase-quantity-button').click();
    await getBySel('increase-quantity-button').click();
    await getBySel('increase-quantity-button').click();
    await expect(getBySel('cart-item-quantity')).toHaveText('4');

    const errorResponse = {
      error: {
        status: '404',
        source: {
          pointer: '/api/v1/cart/item',
        },
        title: 'Product not found',
        detail:
          'Product with id 9df03d81-70d1-408e-a00d-9d78962cf306 not found',
      },
    };

    await page.route('**/api/v1/cart/item', async (route) => {
      await route.fulfill({
        status: Number.parseInt(errorResponse.error.status),
        body: JSON.stringify(errorResponse),
      });
    });

    await page.route('**/api/v1/cart/user', async (route) => {
      await route.fulfill({
        json: loadMock('cart/empty-cart.json'),
      });
    });

    await getBySel('add-to-cart-button').click();

    await expect(getBySel('cart-icon-count')).toHaveCount(0);
  });
});

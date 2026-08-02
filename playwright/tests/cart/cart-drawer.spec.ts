import { expect, test } from '../../utils/baseFixture';
import { loadMock } from '../../utils/loadMocks';

test.describe('Cart drawer page', () => {
  test.beforeEach(async ({ signIn, page }) => {
    await page.route('**/api/v1/user/me', async (route) => {
      await route.fulfill({
        json: loadMock('user/regular-user.json'),
      });
    });
    await signIn();
  });

  test('should decrease product quantity', async ({ page, getBySel }) => {
    await page.route('**/api/v1/cart/user', async (route) => {
      await route.fulfill({
        json: loadMock('cart/cart.json'),
      });
    });

    await expect(getBySel('cart-icon-count')).toHaveText('10');
    await getBySel('cart-icon').click();
    await expect(getBySel('cart-drawer-subtotal')).toHaveText('$ 1776.30');

    const cartItem = getBySel('cart-item-72f5cecc-f428-48f0-af69-5ca12dcc5da4');
    await expect(
      cartItem.locator('[data-test="cart-item-quantity"]'),
    ).toHaveText('4');

    await page.route(
      `**/api/v1/cart/item/72f5cecc-f428-48f0-af69-5ca12dcc5da4`,
      async (route) => {
        await route.fulfill({ status: 200 });
      },
    );

    const cart = loadMock('cart/cart.json');
    cart.included[0].attributes.quantity = 1;
    await page.route('**/api/v1/cart/user', async (route) => {
      await route.fulfill({
        json: cart,
      });
    });

    await cartItem.locator('[data-test="decrease-quantity-button"]').click();
    await cartItem.locator('[data-test="decrease-quantity-button"]').click();
    await cartItem.locator('[data-test="decrease-quantity-button"]').click();
    await expect(
      cartItem.locator('[data-test="cart-item-quantity"]'),
    ).toHaveText('1');
    await expect(getBySel('cart-drawer-subtotal')).toHaveText('$ 1474.80');
  });

  test('should increase product quantity', async ({ page, getBySel }) => {
    await page.route('**/api/v1/cart/user', async (route) => {
      await route.fulfill({
        json: loadMock('cart/cart.json'),
      });
    });

    await expect(getBySel('cart-icon-count')).toHaveText('10');
    await getBySel('cart-icon').click();
    await expect(getBySel('cart-drawer-subtotal')).toHaveText('$ 1776.30');

    const cartItem = getBySel('cart-item-865a1647-f021-4121-b756-be44ff4be177');
    await expect(
      cartItem.locator('[data-test="cart-item-quantity"]'),
    ).toHaveText('3');

    await page.route(
      `**/api/v1/cart/item/865a1647-f021-4121-b756-be44ff4be177`,
      async (route) => {
        await route.fulfill({ status: 200 });
      },
    );

    const cart = loadMock('cart/cart.json');
    cart.included[1].attributes.quantity = 5;
    await page.route('**/api/v1/cart/user', async (route) => {
      await route.fulfill({
        json: cart,
      });
    });

    await cartItem.locator('[data-test="increase-quantity-button"]').click();
    await cartItem.locator('[data-test="increase-quantity-button"]').click();
    await expect(
      cartItem.locator('[data-test="cart-item-quantity"]'),
    ).toHaveText('5');
    await expect(getBySel('cart-drawer-subtotal')).toHaveText('$ 2426.30');
  });

  test('should remove a product', async ({ page, getBySel }) => {
    await page.route('**/api/v1/cart/user', async (route) => {
      await route.fulfill({
        json: loadMock('cart/cart.json'),
      });
    });

    await expect(getBySel('cart-icon-count')).toHaveText('10');
    await getBySel('cart-icon').click();
    await expect(getBySel('cart-drawer-subtotal')).toHaveText('$ 1776.30');

    const cartItem = getBySel('cart-item-72f5cecc-f428-48f0-af69-5ca12dcc5da4');

    await page.route(
      '**/api/v1/cart/item/72f5cecc-f428-48f0-af69-5ca12dcc5da4',
      async (route) => {
        await route.fulfill({ status: 200 });
      },
    );

    await page.route('**/api/v1/cart/user', async (route) => {
      await route.fulfill({
        json: loadMock('cart/remove-cart-item-refetch.json'),
      });
    });

    await cartItem.locator('[data-test="delete-cart-item-button"]').click();

    await expect(cartItem).toHaveCount(0);
    await expect(getBySel('cart-drawer-subtotal')).toHaveText('$ 1374.30');
    await getBySel('cart-drawer-overlay').click();
    await expect(getBySel('cart-icon-count')).toHaveText('6');
  });

  test('should revert quantity when decrease request fails', async ({
    page,
    getBySel,
  }) => {
    await page.route('**/api/v1/cart/user', async (route) => {
      await route.fulfill({
        json: loadMock('cart/cart.json'),
      });
    });

    await expect(getBySel('cart-icon-count')).toHaveText('10');
    await getBySel('cart-icon').click();
    await expect(getBySel('cart-drawer-subtotal')).toHaveText('$ 1776.30');

    const cartItem = getBySel('cart-item-72f5cecc-f428-48f0-af69-5ca12dcc5da4');
    await expect(
      cartItem.locator('[data-test="cart-item-quantity"]'),
    ).toHaveText('4');

    const errorResponse = {
      error: {
        status: '404',
        source: {
          pointer: '/api/v1/cart/item/72f5cecc-f428-48f0-af69-5ca12dcc5da4',
        },
        title: 'Cart item not found',
        detail:
          'Cart item with id 72f5cecc-f428-48f0-af69-5ca12dcc5da4 not found',
      },
    };

    await page.route(
      `**/api/v1/cart/item/72f5cecc-f428-48f0-af69-5ca12dcc5da4`,
      async (route) => {
        await route.fulfill({
          status: Number.parseInt(errorResponse.error.status),
          body: JSON.stringify(errorResponse),
        });
      },
    );

    await page.route('**/api/v1/cart/user', async (route) => {
      await route.fulfill({
        json: loadMock('cart/cart.json'),
      });
    });

    await cartItem.locator('[data-test="decrease-quantity-button"]').click();
    await expect(
      cartItem.locator('[data-test="cart-item-quantity"]'),
    ).toHaveText('4');
    await expect(getBySel('cart-drawer-subtotal')).toHaveText('$ 1776.30');

    await getBySel('cart-drawer-overlay').click();
    await expect(getBySel('cart-icon-count')).toHaveText('10');
  });

  test('should revert quantity when increase request fails', async ({
    page,
    getBySel,
  }) => {
    await page.route('**/api/v1/cart/user', async (route) => {
      await route.fulfill({
        json: loadMock('cart/cart.json'),
      });
    });

    await expect(getBySel('cart-icon-count')).toHaveText('10');
    await getBySel('cart-icon').click();
    await expect(getBySel('cart-drawer-subtotal')).toHaveText('$ 1776.30');

    const cartItem = getBySel('cart-item-72f5cecc-f428-48f0-af69-5ca12dcc5da4');
    await expect(
      cartItem.locator('[data-test="cart-item-quantity"]'),
    ).toHaveText('4');

    const errorResponse = {
      error: {
        status: '404',
        source: {
          pointer: '/api/v1/cart/item/72f5cecc-f428-48f0-af69-5ca12dcc5da4',
        },
        title: 'Cart item not found',
        detail:
          'Cart item with id 72f5cecc-f428-48f0-af69-5ca12dcc5da4 not found',
      },
    };

    await page.route(
      `**/api/v1/cart/item/72f5cecc-f428-48f0-af69-5ca12dcc5da4`,
      async (route) => {
        await route.fulfill({
          status: Number.parseInt(errorResponse.error.status),
          body: JSON.stringify(errorResponse),
        });
      },
    );

    await page.route('**/api/v1/cart/user', async (route) => {
      await route.fulfill({
        json: loadMock('cart/cart.json'),
      });
    });

    await cartItem.locator('[data-test="increase-quantity-button"]').click();
    await expect(
      cartItem.locator('[data-test="cart-item-quantity"]'),
    ).toHaveText('4');
    await expect(getBySel('cart-drawer-subtotal')).toHaveText('$ 1776.30');

    await getBySel('cart-drawer-overlay').click();
    await expect(getBySel('cart-icon-count')).toHaveText('10');
  });

  test('should revert item when delete request fails', async ({
    page,
    getBySel,
  }) => {
    await page.route('**/api/v1/cart/user', async (route) => {
      await route.fulfill({
        json: loadMock('cart/cart.json'),
      });
    });

    await expect(getBySel('cart-icon-count')).toHaveText('10');
    await getBySel('cart-icon').click();
    await expect(getBySel('cart-drawer-subtotal')).toHaveText('$ 1776.30');

    const errorResponse = {
      error: {
        status: '404',
        source: {
          pointer: '/api/v1/cart/item/72f5cecc-f428-48f0-af69-5ca12dcc5da4',
        },
        title: 'Cart item not found',
        detail:
          'Cart item with id 72f5cecc-f428-48f0-af69-5ca12dcc5da4 not found',
      },
    };

    await page.route(
      `**/api/v1/cart/item/72f5cecc-f428-48f0-af69-5ca12dcc5da4`,
      async (route) => {
        await route.fulfill({
          status: Number.parseInt(errorResponse.error.status),
          body: JSON.stringify(errorResponse),
        });
      },
    );

    await page.route('**/api/v1/cart/user', async (route) => {
      await route.fulfill({
        json: loadMock('cart/cart.json'),
      });
    });

    const cartItem = getBySel('cart-item-72f5cecc-f428-48f0-af69-5ca12dcc5da4');
    await cartItem.locator('[data-test="delete-cart-item-button"]').click();
    await expect(cartItem).toHaveCount(1);
    await expect(getBySel('cart-drawer-subtotal')).toHaveText('$ 1776.30');

    await getBySel('cart-drawer-overlay').click();
    await expect(getBySel('cart-icon-count')).toHaveText('10');
  });
});

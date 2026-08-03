import { expect, test } from '../../utils/baseFixture';
import { loadMock } from '../../utils/loadMocks';

test.describe('Cart navbar', () => {
  test.beforeEach(async ({ signIn, page }) => {
    await page.route('**/api/v1/user/me', async (route) => {
      await route.fulfill({
        json: loadMock('user/regular-user.json'),
      });
    });
    await signIn();
  });

  test('should open the cart drawer from the navbar cart icon', async ({
    page,
    getBySel,
  }) => {
    await page.route('**/api/v1/cart/user', async (route) => {
      await route.fulfill({
        json: loadMock('cart/empty-cart.json'),
      });
    });

    const cartIcon = getBySel('cart-icon');
    await expect(cartIcon).toBeVisible();
    await cartIcon.click();

    await expect(getBySel('cart-drawer-content')).toHaveAttribute(
      'data-state',
      'open',
    );
  });

  test('should close the cart drawer when the close button is clicked', async ({
    page,
    getBySel,
  }) => {
    await page.route('**/api/v1/cart/user', async (route) => {
      await route.fulfill({
        json: loadMock('cart/empty-cart.json'),
      });
    });

    await getBySel('cart-icon').click();
    await expect(getBySel('cart-drawer-content')).toHaveAttribute(
      'data-state',
      'open',
    );
    await getBySel('close-cart-drawer-content').click();
    await expect(getBySel('cart-drawer-content')).toHaveAttribute(
      'data-state',
      'closed',
    );
  });

  test('should close the cart drawer when clicking outside the cart', async ({
    page,
    getBySel,
  }) => {
    await page.route('**/api/v1/cart/user', async (route) => {
      await route.fulfill({
        json: loadMock('cart/empty-cart.json'),
      });
    });

    await getBySel('cart-icon').click();
    await expect(getBySel('cart-drawer-content')).toHaveAttribute(
      'data-state',
      'open',
    );
    await getBySel('cart-drawer-overlay').click({ position: { x: 10, y: 10 } });
    await expect(getBySel('cart-drawer-content')).toHaveAttribute(
      'data-state',
      'closed',
    );
  });

  test('should display cart items when the cart contains products', async ({
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

    await expect(getBySel('cart-drawer-title')).toHaveText('Tu carrito (10)');

    const cartItem1 = getBySel(
      'cart-item-72f5cecc-f428-48f0-af69-5ca12dcc5da4',
    );
    await expect(cartItem1).toBeVisible();
    await expect(cartItem1.locator('[data-test="cart-item-price"]')).toHaveText(
      '$ 100.50',
    );
    await expect(
      cartItem1.locator('[data-test="cart-item-quantity"]'),
    ).toHaveText('4');

    const cartItem2 = getBySel(
      'cart-item-865a1647-f021-4121-b756-be44ff4be177',
    );
    await expect(cartItem2).toBeVisible();
    await expect(cartItem2.locator('[data-test="cart-item-price"]')).toHaveText(
      '$ 325.00',
    );
    await expect(
      cartItem2.locator('[data-test="cart-item-quantity"]'),
    ).toHaveText('3');

    const cartItem3 = getBySel(
      'cart-item-81208bb8-8bd8-4777-b651-dc5206b571be',
    );
    await expect(cartItem3).toBeVisible();
    await expect(cartItem3.locator('[data-test="cart-item-price"]')).toHaveText(
      '$ 154.65',
    );
    await expect(
      cartItem3.locator('[data-test="cart-item-quantity"]'),
    ).toHaveText('2');

    const cartItem4 = getBySel(
      'cart-item-c8fac485-1093-474c-b51c-ef120308cedc',
    );
    await expect(cartItem4).toBeVisible();
    await expect(cartItem4.locator('[data-test="cart-item-price"]')).toHaveText(
      '$ 90.00',
    );
    await expect(
      cartItem4.locator('[data-test="cart-item-quantity"]'),
    ).toHaveText('1');

    await expect(getBySel('cart-drawer-subtotal')).toHaveText('$ 1776.30');
  });
});

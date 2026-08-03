import { expect, test } from '../../utils/baseFixture';
import { loadMock } from '../../utils/loadMocks';

test.describe('View product page', () => {
  test('should render a specific product and a list of similar products', async ({
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

    await expect(getBySel('product-image')).toBeVisible();
    await expect(getBySel('product-name')).toContainText('test');
    await expect(getBySel('product-price')).toContainText('444');
    await expect(getBySel('product-description')).toContainText('test');

    const similarProducts = getBySel('similar-products');
    await expect(similarProducts).toBeVisible();
    const products = similarProducts.locator('[data-test^="product-card-"]');
    await expect(products).toHaveCount(3);

    await getBySel('view-product-55c6f09d-62ea-4c26-9cf0-a85ad1383748').click();
    await expect(page).toHaveURL(
      '/product/55c6f09d-62ea-4c26-9cf0-a85ad1383748',
    );
  });
});

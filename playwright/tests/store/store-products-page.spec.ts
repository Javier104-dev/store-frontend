import { expect, test } from '../../utils/baseFixture';
import { loadMock } from '../../utils/loadMocks';

test.describe('Store products page', () => {
	test.beforeEach(async ({ page, signIn }) => {
		await signIn();
		await page.route('**/api/v1/product/owner', async (route) => {
			await route.fulfill({
				json: loadMock('store/products-from-owner.json'),
			});
		});
		await page.goto('/store/products');
	});

	test('should render all products for the logged-in user', async ({
		getBySel,
	}) => {
		const productsFromStore = getBySel('store-products');
		await expect(productsFromStore).toBeVisible();
		const cards = productsFromStore.locator(
			'[data-test^="admin-product-card-"]',
		);
		await expect(cards).toHaveCount(6);
	});

	test('should be able to delete a product', async ({ getBySel, page }) => {
		const adminProductCard = getBySel(
			'admin-product-card-14193ebf-b6d8-4888-9d51-83d0077fc68f',
		);
		await expect(adminProductCard).toBeVisible();

		await page.route(
			'**/api/v1/product/14193ebf-b6d8-4888-9d51-83d0077fc68f',
			async (route) => {
				await route.fulfill({
					status: 200,
				});
			},
		);

		await page.route('**/api/v1/product/owner', async (route) => {
			await route.fulfill({
				json: loadMock('store/products-from-owner-without-deleted.json'),
			});
		});

		await adminProductCard.locator('[data-test^="delete-button"]').click();

		await expect(getBySel('toast-container')).toContainText(
			'Product deleted successfully',
		);
		await expect(
			getBySel('admin-product-card-14193ebf-b6d8-4888-9d51-83d0077fc68f'),
		).toHaveCount(0);
	});

	test('should be able to edit a product', async ({ getBySel, page }) => {
		const adminProductCard = getBySel(
			'admin-product-card-14193ebf-b6d8-4888-9d51-83d0077fc68f',
		);
		await expect(adminProductCard).toBeVisible();
		await adminProductCard.locator('[data-test^="edit-button"]').click();
		await expect(page).toHaveURL(
			'/store/product/14193ebf-b6d8-4888-9d51-83d0077fc68f/edit',
		);
	});

	test('should be able to add a product', async ({ getBySel, page }) => {
		const createButton = getBySel('create-product-button');
		await expect(createButton).toBeVisible();
		await createButton.click();
		await expect(page).toHaveURL('/store/product/new');
	});
});

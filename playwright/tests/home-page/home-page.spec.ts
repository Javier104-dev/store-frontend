import { expect, test } from '../../utils/baseFixture';
import { loadMock } from '../../utils/loadMocks';

test.describe('Home page', () => {
	test.beforeEach(async ({ page }) => {
		await page.route('**/api/v1/catalog/categories', async (route) => {
			await route.fulfill({
				json: loadMock('catalog/categories-with-products.json'),
			});
		});
		await page.goto('/');
	});

	test('should render the home page correctly', async ({ getBySel }) => {
		await expect(getBySel('navbar')).toBeVisible();
		await expect(getBySel('banner')).toBeVisible();
	});

	test('should render the categories with their products correctly', async ({
		getBySel,
	}) => {
		const categori1 = getBySel('7dd961e6-d94d-4ad5-89ac-42c18f027347');
		await expect(categori1).toBeVisible();
		const cards1 = categori1.locator('[data-test^="product-card-"]');
		await expect(cards1).toHaveCount(3);

		const categori2 = getBySel('dde00b00-3ae7-4af3-bb58-c5d801413216');
		await expect(categori2).toBeVisible();
		const cards2 = categori2.locator('[data-test^="product-card-"]');
		await expect(cards2).toHaveCount(4);

		const categori3 = getBySel('dec25553-f170-4a69-a593-a1ef660720f6');
		await expect(categori3).toBeVisible();
		const cards3 = categori3.locator('[data-test^="product-card-"]');
		await expect(cards3).toHaveCount(4);

		const categori4 = getBySel('e6e3db5a-bb6a-450f-b737-7eeca3cb252c');
		await expect(categori4).toBeVisible();
		const cards4 = categori4.locator('[data-test^="product-card-"]');
		await expect(cards4).toHaveCount(3);

		const categori5 = getBySel('249602c3-cef3-42c3-9f72-3b7da7381f87');
		await expect(categori5).toBeVisible();
		const cards5 = categori5.locator('[data-test^="product-card-"]');
		const expectedCards = test.info().project.name === 'mobile' ? 4 : 5;
		await expect(cards5).toHaveCount(expectedCards);

		const categori6 = getBySel('d2b553df-1a38-49e2-8f21-e2a0813e25e5');
		await expect(categori6).toBeVisible();
		const cards6 = categori6.locator('[data-test^="product-card-"]');
		await expect(cards6).toHaveCount(4);

		const categori7 = getBySel('b8c6999e-5409-4744-98b2-15542d0e0bb2');
		await expect(categori7).toBeVisible();
		const cards7 = categori7.locator('[data-test^="product-card-"]');
		await expect(cards7).toHaveCount(3);
	});

	test('cards must be clickable and redirect to the selected product', async ({
		getBySel,
		page,
	}) => {
		const categori1 = getBySel('7dd961e6-d94d-4ad5-89ac-42c18f027347');
		await categori1
			.locator(
				'[data-test="view-product-55c6f09d-62ea-4c26-9cf0-a85ad1383748"]',
			)
			.click();
		await expect(page).toHaveURL(
			'/product/55c6f09d-62ea-4c26-9cf0-a85ad1383748',
		);
		await page.goBack();

		const categori4 = getBySel('e6e3db5a-bb6a-450f-b737-7eeca3cb252c');
		await categori4
			.locator(
				'[data-test="view-product-9df03d81-70d1-408e-a00d-9d78962cf306"]',
			)
			.click();
		await expect(page).toHaveURL(
			'/product/9df03d81-70d1-408e-a00d-9d78962cf306',
		);
		await page.goBack();

		const categori7 = getBySel('b8c6999e-5409-4744-98b2-15542d0e0bb2');
		await categori7
			.locator(
				'[data-test="view-product-55c6f09d-62ea-4c26-9cf0-a85ad1383748"]',
			)
			.click();
		await expect(page).toHaveURL(
			'/product/55c6f09d-62ea-4c26-9cf0-a85ad1383748',
		);
		await page.goBack();
	});
});

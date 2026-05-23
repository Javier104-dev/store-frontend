import { expect, test } from '../../utils/baseFixture';
import { loadMock } from '../../utils/loadMocks';

import { PRODUCT_FORM_CONFIG } from '@/features/product/constants/product-form.config';
import { PRODUCT_TOAST_MESSAGES } from '@/features/product/constants/product-toast-messages';

test.describe('Product form page', () => {
  test.beforeEach(async ({ signIn, page }) => {
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
    await page.route('**/api/v1/category?page%5Bsize%5D=25', async (route) => {
      await route.fulfill({
        json: loadMock('category/categories.json'),
      });
    });
    await page.goto('/store/product/new');
  });

  test('should be able to add and remove images in the form', async ({
    getBySel,
  }) => {
    const inputFiles = getBySel('input-files');
    await expect(inputFiles).toBeVisible();
    await inputFiles.setInputFiles([
      {
        name: 'image-1.png',
        mimeType: 'image/png',
        buffer: Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
      },
      {
        name: 'image-2.png',
        mimeType: 'image/png',
        buffer: Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
      },
    ]);

    const image0 = getBySel('product-image-0');
    const image1 = getBySel('product-image-1');

    await expect(image0).toBeVisible();
    await expect(image1).toBeVisible();

    const deleteButton = image0.locator('[data-test="delete-button"]');
    await deleteButton.click();

    await expect(image0).toHaveCount(1);
    await expect(image1).toHaveCount(0);
  });

  test('should be able to add and remove categories in the form', async ({
    getBySel,
  }) => {
    await getBySel('open-add-category-modal-button').click();
    await expect(getBySel('categories-modal')).toBeVisible();

    const category1 = '7dd961e6-d94d-4ad5-89ac-42c18f027347';
    const category2 = 'b8c6999e-5409-4744-98b2-15542d0e0bb2';

    const categorySelectTag1 = `category-select-tag-${category1}`;
    const categorySelectTag2 = `category-select-tag-${category2}`;

    const availableCategoriesSection = getBySel('available-categories');
    await expect(availableCategoriesSection).toBeVisible();
    await getBySel(categorySelectTag1).click();
    await getBySel(categorySelectTag2).click();
    const availableCategory1 = availableCategoriesSection.locator(
      `[data-test=${categorySelectTag1}]`,
    );
    await expect(availableCategory1).toHaveCount(0);
    const availableCategory2 = availableCategoriesSection.locator(
      `[data-test=${categorySelectTag2}]`,
    );
    await expect(availableCategory2).toHaveCount(0);

    const categoryRemoveTag1 = `category-remove-tag-${category1}`;
    const categoryRemoveTag2 = `category-remove-tag-${category2}`;

    const selectedCategoriesSection = getBySel('selected-categories');
    await expect(selectedCategoriesSection).toBeVisible();
    const removeCategory1 = selectedCategoriesSection.locator(
      `[data-test=${categoryRemoveTag1}]`,
    );
    await expect(removeCategory1).toHaveCount(1);
    const removeCategory2 = selectedCategoriesSection.locator(
      `[data-test=${categoryRemoveTag2}]`,
    );
    await expect(removeCategory2).toHaveCount(1);

    await getBySel('close-modal-button').click();
    await expect(getBySel('categories-modal')).toHaveCount(0);

    await expect(getBySel(categoryRemoveTag1)).toHaveCount(1);
    await expect(getBySel(categoryRemoveTag2)).toHaveCount(1);
    await getBySel(categoryRemoveTag1).click();
    await getBySel(categoryRemoveTag2).click();
    await expect(getBySel(categoryRemoveTag1)).toHaveCount(0);
    await expect(getBySel(categoryRemoveTag2)).toHaveCount(0);
  });

  test('should be able to use the form to create a product', async ({
    getBySel,
    page,
  }) => {
    const newProduct = {
      categoryIds: [
        '7dd961e6-d94d-4ad5-89ac-42c18f027347',
        'b8c6999e-5409-4744-98b2-15542d0e0bb2',
      ],
      name: 'product 1',
      price: '1000',
      description: 'description',
    };

    await expect(getBySel('section-title')).toContainText(
      PRODUCT_FORM_CONFIG.create.title,
    );

    const inputFiles = getBySel('input-files');
    await inputFiles.setInputFiles([
      {
        name: 'image-1.png',
        mimeType: 'image/png',
        buffer: Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
      },
      {
        name: 'image-2.png',
        mimeType: 'image/png',
        buffer: Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
      },
    ]);

    await getBySel('open-add-category-modal-button').click();
    await getBySel(`category-select-tag-${newProduct.categoryIds[0]}`).click();
    await getBySel(`category-select-tag-${newProduct.categoryIds[1]}`).click();

    await getBySel('close-modal-button').click();

    await getBySel('name').fill(newProduct.name);
    await getBySel('price').fill(newProduct.price);
    await getBySel('description').fill(newProduct.description);

    await page.route('**/api/v1/catalog/product', async (route) => {
      await route.fulfill({ status: 201 });
    });

    await expect(getBySel('product-form-submit')).toContainText(
      PRODUCT_FORM_CONFIG.create.submitText,
    );
    await getBySel('product-form-submit').click();

    await expect(page).toHaveURL('/store/products');
    await expect(getBySel('toast-container')).toContainText(
      PRODUCT_TOAST_MESSAGES.created,
    );
  });

  test('should display the product data in the edit form', async ({
    page,
    getBySel,
  }) => {
    const selectedProductId = 'a5807543-048a-46e8-bedf-ea60e1b86bc2';
    const selecteProduct = {
      categoryIds: [
        '7dd961e6-d94d-4ad5-89ac-42c18f027347',
        'dec25553-f170-4a69-a593-a1ef660720f6',
        'b8c6999e-5409-4744-98b2-15542d0e0bb2',
      ],
      name: 'product 1',
      price: '1000',
      description: 'description',
      images: ['product-image-0', 'product-image-1'],
    };

    await page.route(
      `**/api/v1/product/${selectedProductId}`,
      async (route) => {
        await route.fulfill({
          json: loadMock('store/selected-product.json'),
        });
      },
    );

    await page.goto(`/store/product/${selectedProductId}/edit`);

    await expect(getBySel(selecteProduct.images[0])).toHaveCount(1);
    await expect(getBySel(selecteProduct.images[0])).toHaveCount(1);
    await expect(
      getBySel(`category-remove-tag-${selecteProduct.categoryIds[0]}`),
    ).toHaveCount(1);
    await expect(
      getBySel(`category-remove-tag-${selecteProduct.categoryIds[1]}`),
    ).toHaveCount(1);
    await expect(
      getBySel(`category-remove-tag-${selecteProduct.categoryIds[2]}`),
    ).toHaveCount(1);
    await getBySel('name').fill(selecteProduct.name);
    await getBySel('price').fill(selecteProduct.price);
    await getBySel('description').fill(selecteProduct.description);
  });

  test('should allow editing a selected product', async ({
    page,
    getBySel,
  }) => {
    const selectedProductId = 'a5807543-048a-46e8-bedf-ea60e1b86bc2';
    await page.route(
      `**/api/v1/product/${selectedProductId}`,
      async (route) => {
        await route.fulfill({
          json: loadMock('store/selected-product.json'),
        });
      },
    );

    await page.goto(`/store/product/${selectedProductId}/edit`);

    await expect(getBySel('section-title')).toContainText(
      PRODUCT_FORM_CONFIG.edit.title,
    );

    const updatedProductData = {
      name: 'new name',
      price: '3000',
      description: 'new description',
    };

    const image0 = getBySel('product-image-0');
    const deleteButton = image0.locator('[data-test="delete-button"]');
    await deleteButton.click();

    await getBySel('name').fill(updatedProductData.name);
    await getBySel('price').fill(updatedProductData.price);
    await getBySel('description').fill(updatedProductData.description);

    await page.route(
      `**/api/v1/catalog/product/${selectedProductId}`,
      async (route) => {
        await route.fulfill({ status: 200 });
      },
    );

    await expect(getBySel('product-form-submit')).toContainText(
      PRODUCT_FORM_CONFIG.edit.submitText,
    );
    await getBySel('product-form-submit').click();

    await expect(page).toHaveURL('/store/products');
    await expect(getBySel('toast-container')).toContainText(
      PRODUCT_TOAST_MESSAGES.updated,
    );
  });
});

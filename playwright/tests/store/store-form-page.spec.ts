import { expect, test } from '../../utils/baseFixture';
import { loadMock } from '../../utils/loadMocks';

import { STORE_FORM_MESSAGES } from '@/features/store/components/form/messages/store-form.messages';
import { STORE_FORM_CONFIG } from '@/features/store/constants/store-form.config';
import { STORE_TOAST_MESSAGES } from '@/features/store/constants/store-toast-messages';

test.describe('Product form page', () => {
  test.beforeEach(async ({ signIn, page }) => {
    await page.route('**/api/v1/user/me', async (route) => {
      await route.fulfill({
        json: loadMock('user/admin-user.json'),
      });
    });

    await signIn();
  });

  test('should validate store form schema rules', async ({
    page,
    getBySel,
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

    await page.route('**/api/v1/store/owner', async (route) => {
      await route.fulfill({
        status: Number.parseInt(errorResponse.error.status),
        body: JSON.stringify(errorResponse),
      });
    });

    await page.goto('/store');

    await getBySel('name').focus();
    await getBySel('name').blur();
    await expect(getBySel('form-input-error-name')).toContainText(
      STORE_FORM_MESSAGES.NAME_REQUIRED,
    );

    await getBySel('name').fill('abcd');
    await expect(getBySel('form-input-error-name')).toContainText(
      STORE_FORM_MESSAGES.NAME_MIN,
    );

    await getBySel('name').fill('abcdefgh');
    await expect(getBySel('form-input-error-name')).toHaveCount(0);
  });

  test('should create a store', async ({ page, getBySel }) => {
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

    await page.route('**/api/v1/store/owner', async (route) => {
      await route.fulfill({
        status: Number.parseInt(errorResponse.error.status),
        body: JSON.stringify(errorResponse),
      });
    });

    await page.goto('/store');

    await expect(getBySel('toast-container')).toContainText(
      errorResponse.error.detail,
    );
    await expect(getBySel('section-title')).toContainText(
      STORE_FORM_CONFIG.create.title,
    );
    await expect(getBySel('store-form-submit')).toContainText(
      STORE_FORM_CONFIG.create.submitText,
    );

    await getBySel('name').fill('abcdefgh');

    await page.route('**/api/v1/store', async (route) => {
      await route.fulfill({
        status: 201,
      });
    });

    await getBySel('store-form-submit').click();

    await expect(getBySel('toast-container')).toContainText(
      STORE_TOAST_MESSAGES.created,
    );
    await expect(page).toHaveURL('/store/products');
  });

  test('should update a store', async ({ page, getBySel }) => {
    await page.route('**/api/v1/store/owner', async (route) => {
      await route.fulfill({
        json: loadMock('store/store-from-owner.json'),
      });
    });

    await page.goto('/store');

    await expect(getBySel('section-title')).toContainText(
      STORE_FORM_CONFIG.edit.title,
    );
    await expect(getBySel('store-form-submit')).toContainText(
      STORE_FORM_CONFIG.edit.submitText,
    );
    await expect(getBySel('name')).toHaveValue('store');

    await getBySel('name').fill('new name');

    await page.route('**/api/v1/store', async (route) => {
      await route.fulfill({
        status: 200,
      });
    });

    await getBySel('store-form-submit').click();

    await expect(getBySel('toast-container')).toContainText(
      STORE_TOAST_MESSAGES.updated,
    );
    await expect(page).toHaveURL('/store/products');
  });
});

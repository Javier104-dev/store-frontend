import { expect, test } from '../../utils/baseFixture';

const username = '_test@biggertech.co';

test.describe('/auth/forgot-password', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/forgot-password');
  });

  test('should be able to use the forgot password form', async ({
    page,
    getBySel,
  }) => {
    const successResponse = {
      data: {
        attributes: {
          message: 'Password recovery email sent',
        },
      },
    };

    await getBySel('forgot-password-username').fill(username);

    await page.route('**/auth/forgot-password', async (route) => {
      await route.fulfill({
        body: JSON.stringify(successResponse),
      });
    });

    await getBySel('forgot-password-submit').click();

    await expect(getBySel('toast-container')).toContainText(
      successResponse.data.attributes.message,
    );
  });

  test('should be able to visit confirm password', async ({ page }) => {
    await page.click('[data-test="link-confirm-password"]');
    await expect(page).toHaveURL('/auth/confirm-password');
  });

  test('should validate username field', async ({ validateUsername }) => {
    await validateUsername(
      'forgot-password-username',
      'form-input-error-username',
    );
  });

  test('should show an error if the user does not exist', async ({
    page,
    getBySel,
  }) => {
    const errorResponse = {
      error: {
        detail: `${username} was not found`,
        source: { pointer: '/api/v1/auth/forgot-password' },
        status: '404',
        title: 'Username Not Found',
      },
    };

    await getBySel('forgot-password-username').fill(username);

    await page.route('**/auth/forgot-password', async (route) => {
      await route.fulfill({
        status: parseInt(errorResponse.error.status),
        body: JSON.stringify(errorResponse),
      });
    });

    await getBySel('forgot-password-submit').click();

    await expect(getBySel('toast-container')).toContainText(
      errorResponse.error.detail,
    );
  });
});

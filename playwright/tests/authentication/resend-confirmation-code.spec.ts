import { expect, test } from '../../utils/baseFixture';

const username = '_test@biggertech.co';

test.describe('/auth/resend-confirmation-code', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/resend-confirmation-code');
  });

  const successResponse = {
    data: {
      attributes: {
        success: true,
        message: 'A new code has been sent to your e-mail address',
      },
    },
  };

  test('should be able to use the resend confirmation code form', async ({
    page,
    getBySel,
  }) => {
    await getBySel('resend-confirmation-code-username').fill(username);

    await page.route('**/auth/resend-confirmation-code', async (route) => {
      await route.fulfill({
        body: JSON.stringify(successResponse),
      });
    });

    await getBySel('resend-confirmation-code-submit').click();

    await expect(getBySel('toast-container')).toContainText(
      successResponse.data.attributes.message,
    );
  });

  test('should be able to visit confirm user', async ({ page }) => {
    await page.click('[data-test="link-confirm-user"]');
    await expect(page).toHaveURL('/auth/confirm-user');
  });

  test('should validate username field', async ({ validateUsername }) => {
    await validateUsername(
      'resend-confirmation-code-username',
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
        source: { pointer: '/api/v1/auth/resend-confirmation-code' },
        status: '404',
        title: 'Username Not Found',
      },
    };

    await getBySel('resend-confirmation-code-username').fill(username);

    await page.route('**/auth/resend-confirmation-code', async (route) => {
      await route.fulfill({
        status: parseInt(errorResponse.error.status),
        body: JSON.stringify(errorResponse),
      });
    });

    await getBySel('resend-confirmation-code-submit').click();

    await expect(getBySel('toast-container')).toContainText(
      errorResponse.error.detail,
    );
  });
});

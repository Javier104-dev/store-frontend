import { expect, test } from '../../utils/baseFixture';
import { loadMock } from '../../utils/loadMocks';

import { SIGN_OUT_SUCCESS_MESSAGE } from '@pages/auth/context/auth-messages';

test.describe('/auth/sign-out', () => {
  test.beforeEach(async ({ signIn, page }) => {
    await page.route('**/api/v1/user/me', async (route) => {
      await route.fulfill({
        json: loadMock('user/regular-user.json'),
      });
    });
    await signIn();
  });

  test('should be able to sign out', async ({ page, getBySel }) => {
    const successResponse = {
      data: {
        attributes: {
          message: 'Sign out successful',
        },
      },
    };

    await page.route('**/auth/sign-out', async (route) => {
      await route.fulfill({
        body: JSON.stringify(successResponse),
      });
    });

    await getBySel('sign-out').click();
    await expect(getBySel('toast-container')).toContainText(
      SIGN_OUT_SUCCESS_MESSAGE,
    );
  });
});

import { expect, test } from '../../utils/baseFixture';

import { SIGN_OUT_SUCCESS_MESSAGE } from '@pages/auth/context/auth-messages';

test.describe('/auth/sign-out', () => {
	test.beforeEach(async ({ signIn }) => {
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

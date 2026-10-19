import { test, expect } from '@playwright/test';

test.describe('API Integration', () => {
  test('should render dogs from the API on the homepage', async ({ page }) => {
    await page.goto('/');

    const dogCards = page.getByTestId('dog-card');
    await expect(dogCards).toHaveCount(6);

    await expect(page.getByTestId('dog-name').nth(0)).toHaveText('Buddy');
    await expect(page.getByTestId('dog-breed').nth(0)).toHaveText('Golden Retriever');

    await expect(page.getByTestId('dog-name').nth(1)).toHaveText('Luna');
    await expect(page.getByTestId('dog-breed').nth(1)).toHaveText('Husky');

    await expect(page.getByTestId('dog-name').nth(2)).toHaveText('Max');
    await expect(page.getByTestId('dog-breed').nth(2)).toHaveText('German Shepherd');
  });

  test('should render dog details from the API', async ({ page }) => {
    await page.goto('/dog/1');

    await expect(page.getByTestId('dog-details')).toBeVisible();
    await expect(page.getByTestId('dog-name')).toHaveText('Buddy');
    await expect(page.getByTestId('dog-breed')).toContainText('Golden Retriever');
    await expect(page.getByTestId('dog-age')).toContainText('3');
    await expect(page.getByTestId('dog-gender')).toContainText('Male');
    await expect(page.getByTestId('dog-status')).toHaveText('Available');
  });

  test('should return 404 details for non-existent dog', async ({ page }) => {
    await page.goto('/dog/99999');

    await expect(page.getByTestId('error-message')).toBeVisible();
    await expect(page.getByTestId('error-message')).toContainText('not found');
  });

  test('should link from dog card to detail page', async ({ page }) => {
    await page.goto('/');

    const firstCard = page.getByTestId('dog-card').first();
    await firstCard.click();

    await expect(page).toHaveURL(/\/dog\/1$/);
    await expect(page.getByTestId('dog-details')).toBeVisible();
  });
});

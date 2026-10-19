import { test, expect } from '@playwright/test';

test.describe('Dog Details', () => {
  test('should navigate to dog details from homepage', async ({ page }) => {
    await page.goto('/');

    const firstDogCard = page.getByTestId('dog-card').first();
    const dogName = await page.getByTestId('dog-name').first().textContent();

    await firstDogCard.click();

    await expect(page).toHaveURL(/\/dog\/\d+/);
    await expect(page).toHaveTitle(/Dog Details - Tailspin Shelter/);
    await expect(page.getByTestId('dog-details')).toBeVisible();
    await expect(page.getByTestId('dog-name')).toHaveText(dogName!);
  });

  test('should display full dog details for Buddy', async ({ page }) => {
    await page.goto('/dog/1');

    await expect(page.getByTestId('dog-details')).toBeVisible();
    await expect(page.getByTestId('dog-name')).toHaveText('Buddy');
    await expect(page.getByTestId('dog-breed')).toContainText('Golden Retriever');
    await expect(page.getByTestId('dog-age')).toContainText('3');
    await expect(page.getByTestId('dog-gender')).toContainText('Male');
    await expect(page.getByTestId('dog-status')).toHaveText('Available');
    await expect(page.getByTestId('dog-description')).toContainText('friendly and loyal');
  });

  test('should navigate back to homepage from dog details', async ({ page }) => {
    await page.goto('/dog/1');

    await page.getByTestId('back-link').click();

    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Welcome to Tailspin Shelter' })).toBeVisible();
  });

  test('should handle invalid dog ID gracefully', async ({ page }) => {
    await page.goto('/dog/99999');

    await expect(page).toHaveTitle(/Dog Details - Tailspin Shelter/);
    await expect(page.getByTestId('error-message')).toBeVisible();
    await expect(page.getByTestId('back-link')).toBeVisible();
  });
});

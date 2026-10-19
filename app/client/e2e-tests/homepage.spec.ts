import { test, expect } from '@playwright/test';

test.describe('Tailspin Shelter Homepage', () => {
  test('should load homepage and display title', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Tailspin Shelter - Find Your Forever Friend/);

    await expect(page.getByRole('heading', { name: 'Welcome to Tailspin Shelter' })).toBeVisible();

    await expect(page.getByText('Find your perfect companion from our wonderful selection')).toBeVisible();
  });

  test('should display dog list', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Available Dogs' })).toBeVisible();

    const dogList = page.getByTestId('dog-list');
    await expect(dogList).toBeVisible();

    const dogCards = page.getByTestId('dog-card');
    await expect(dogCards).toHaveCount(6);
  });

  test('should display dog names and breeds', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('dog-name').nth(0)).toHaveText('Buddy');
    await expect(page.getByTestId('dog-breed').nth(0)).toHaveText('Golden Retriever');

    await expect(page.getByTestId('dog-name').nth(1)).toHaveText('Luna');
    await expect(page.getByTestId('dog-breed').nth(1)).toHaveText('Husky');

    await expect(page.getByTestId('dog-name').nth(2)).toHaveText('Max');
    await expect(page.getByTestId('dog-breed').nth(2)).toHaveText('German Shepherd');
  });

  test('should display pagination controls', async ({ page }) => {
    await page.goto('/');

    const pagination = page.getByTestId('pagination');
    await expect(pagination).toBeVisible();
    await expect(page.getByTestId('pagination-info')).toContainText('Page 1 of 2');
    await expect(page.getByTestId('pagination-next')).toBeVisible();
  });

  test('should navigate to page 2', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('pagination-next').click();
    await expect(page).toHaveURL(/page=2/);

    const dogCards = page.getByTestId('dog-card');
    await expect(dogCards).toHaveCount(4);
    await expect(page.getByTestId('dog-name').nth(0)).toHaveText('Rocky');
  });
});

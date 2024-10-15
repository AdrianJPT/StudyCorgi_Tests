import { test, expect } from '@playwright/test';

test('Validate that I have 0 credits', async ({ page }) => {
  await page.goto('https://service.studycorgi.com/login');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('adrianpablotamayo@gmail.com');
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Type your password').fill('ate6q3g7');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.locator('app-header-balance')).toContainText('$0.00');
});
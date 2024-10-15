import { test, expect } from '@playwright/test';

test('Validate that the user has 0 credits', async ({ page }) => {
  await page.goto('https://service.studycorgi.com/login');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('adrianpablotamayo@gmail.com');
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Type your password').fill('ate6q3g7');
  await page.getByRole('button', { name: 'Sign In' }).click();
  // sleep
  await page.waitForTimeout(10000);
  await expect(page.locator('app-header-balance')).toContainText('$0.00');
  
});
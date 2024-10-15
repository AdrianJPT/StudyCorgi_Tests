import { test, expect, chromium } from '@playwright/test';


test('Validate that User can not complete an order without instructions', async ({ page }) => {
  await page.goto('https://service.studycorgi.com/login');
  await page.getByPlaceholder('Email').click();

  await page.getByPlaceholder('Email').fill('adrianpablotamayo@gmail.com');
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Type your password').fill('ate6q3g7');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('#sidebar app-order-now-timer').getByText('New order').click();
  await page.getByPlaceholder('Type your instructions here.').click();
  await page.getByText('EssayEssayResearch').click();
  await page.getByRole('button', { name: 'Complete your order' }).click();

  // Assertions
  await expect(page.getByText('Please type your instructions')).toBeVisible();
  await expect(page.getByText('Total: $13.00 $')).toBeVisible();
});


test('Validate that all the paid plans are visible', async ({ page }) => {
  await page.goto('https://service.studycorgi.com/login');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('adrianpablotamayo@gmail.com');
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Type your password').fill('ate6q3g7');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.locator('#sidebar app-order-now-timer').getByText('New order').click();
  
  await page.getByPlaceholder('Type your instructions here.').click();
  await page.getByPlaceholder('Type your instructions here.').fill('Whatever Instruccions just for testing porpuses');
 
  await page.getByRole('button', { name: 'Complete your order' }).click();
  
  await page.getByTitle('Plagreport').click();
  await page.getByRole('button', { name: 'Continue' }).click();
  
  // Assertion First Class
  await expect(page.getByText('First Class Over 98% success rate $')).toBeVisible();
  await expect(page.getByRole('main')).toContainText('First Class');
  
  // Assertion Superior
  await expect(page.getByRole('heading', { name: 'Superior' })).toBeVisible();
  await expect(page.getByText('Most popular')).toBeVisible();
  await expect(page.getByRole('main')).toContainText('Superior');
  
  // Assertion Standard
  await expect(page.getByRole('heading', { name: 'Standard' })).toBeVisible();
  await expect(page.getByRole('main')).toContainText('Standard');
  
  // Payment Button must be visible
  await expect(page.getByRole('button', { name: 'Secure checkout' })).toBeVisible();
  
  });
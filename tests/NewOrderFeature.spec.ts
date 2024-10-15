import { test, expect, chromium } from '@playwright/test';

test.afterEach(async ({ browser }) => {
  await browser.close();
});

test('Validate that User can not complete an order without instructions', async ({ page }) => {
  await page.goto('https://service.studycorgi.com/login');
  await page.getByPlaceholder('Email').click();

  await page.getByPlaceholder('Email').fill('adrianpablotamayo@gmail.com');
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Type your password').fill('Test123456$');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByText('New order', { exact: true }).click();
  await page.getByText('EssayEssayResearch').click();
  await page.getByRole('button', { name: 'Complete your order' }).click();

  // Assertions
  await expect(page.getByText('Please type your instructions')).toBeVisible();
  await expect(page.getByText('Total: $13.00 $')).toBeVisible();
  await expect(page.getByRole('main')).toContainText('$11.05');
});


test('Validate that all the paid plans are visible', async ({ page }) => {
  await page.goto('https://service.studycorgi.com/login');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('adrianpablotamayo@gmail.com');
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Type your password').fill('Test123456$');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.getByText('New order', { exact: true }).click();
  await page.getByPlaceholder('Type your instructions here.').click();
  await page.getByPlaceholder('Type your instructions here.').fill('Whatever Instruccions just for testing porpuses');
 
  await page.getByRole('button', { name: 'Complete your order' }).click();
  
  await page.getByTitle('Plagreport').click();
  await page.getByRole('button', { name: 'Continue' }).click();
  
  // Assertion First Class
  await expect(page.getByText('First Class Over 98% success rate $')).toBeVisible();
  await expect(page.getByRole('main')).toContainText('First Class');
  await expect(page.getByRole('main')).toContainText('$23.08');
  
  // Assertion Superior
  await expect(page.getByRole('heading', { name: 'Superior' })).toBeVisible();
  await expect(page.getByText('Most popular')).toBeVisible();
  await expect(page.getByRole('main')).toContainText('Superior');
  await expect(page.getByRole('main')).toContainText('$19.76');
  
  // Assertion Standard
  await expect(page.getByRole('heading', { name: 'Standard' })).toBeVisible();
  await expect(page.getByRole('main')).toContainText('Standard');
  await expect(page.getByRole('main')).toContainText('Standard High quality original paper $17.00 Best available expert fully qualified in your area of study 14 days to request changes to your paper — — $17.00');
  
  // Payment Button must be visible
  await expect(page.getByRole('button', { name: 'Secure checkout' })).toBeVisible();
  
  });
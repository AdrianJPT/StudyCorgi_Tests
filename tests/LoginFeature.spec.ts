import { test, expect } from '@playwright/test';

test('Login Succesfully', async ({ page }) => {
  await page.goto('https://service.studycorgi.com/login');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('adrianpablotamayo@gmail.com');
  await page.getByPlaceholder('Type your password').click();
  await page.getByPlaceholder('Type your password').fill('Test123456$');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Assertions
  await expect(page.getByRole('heading', { name: 'My Orders' }).getByRole('link')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^New order$/ })).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^Log out$/ })).toBeVisible();
});


test('Rest Password Succesfully', async ({ page }) => {
await page.goto('https://service.studycorgi.com/login');
await page.getByRole('link', { name: 'Forgot password' }).click();

await page.getByPlaceholder('Email').click();
await page.getByPlaceholder('Email').fill('adrianpablotamayo@gmail.com');
await page.getByRole('button', { name: 'Send me the password' }).click();

// Assertions
await expect(page.getByRole('heading', { name: 'We’ve just sent you the' })).toBeVisible();
await expect(page.getByRole('heading')).toContainText('We’ve just sent you the password by email');
await expect(page.getByPlaceholder('Type your password')).toBeVisible();
await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
});

test('Validate that I can not register an account that already exists', async ({ page }) => {
  await page.goto('https://service.studycorgi.com/login');
  await page.getByRole('link', { name: 'Create a new account' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('testdatatemporal@gmail.com');
  await page.getByPlaceholder('Type your password').click();
  await page.getByPlaceholder('Type your password').fill('Whatever123456');
  await page.getByLabel('I agree to terms and privacy').check();
  await page.getByRole('button', { name: 'Create account' }).click();
  
  // Assertions
  await expect(page.getByText('This email is already')).toBeVisible();
  await expect(page.getByRole('heading')).toContainText('Welcome back!'); 
});
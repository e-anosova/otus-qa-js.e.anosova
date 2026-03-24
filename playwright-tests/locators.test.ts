import { test , expect } from '@playwright/test'

test('Check locators tests', async( {page} ) => {
    await page.goto('https://rwa-188.130.251.61.sslip.io/login');

    //Проверка формы авторизации
  const form = page.locator('form');
  await expect(form).toBeVisible();

  // Проверка поля Email
  await expect(page.getByPlaceholder('Email')).toBeVisible();

  // Проверка поля Password
  await expect(page.getByPlaceholder('Password')).toBeVisible();

  // 4. Проверка кнопка Sign in
  await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
});
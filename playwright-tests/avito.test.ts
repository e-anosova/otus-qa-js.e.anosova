import { test , expect } from '@playwright/test'
import { pseudoRandomBytes } from 'node:crypto';

test('Проверка открытия фильтра по категориям', async( {page} ) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('https://www.avito.ru/');

    await page.locator('[data-marker="top-rubricator/all-categories"]').waitFor({ state: 'visible', timeout: 10000 });
    await page.locator('[data-marker="top-rubricator/all-categories"]').click();

    await expect(page.locator('[data-marker="top-rubricator/root-category-25984"]')).toBeVisible;
    await expect(page.locator('.new-rubricator-content-rightContent-nVnz6')).toBeVisible;
}); 

test('Проверка открытия каталога новостроек на авито', async( {page} ) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('https://www.avito.ru/');

    await page.getByRole('button', { name: 'Каталоги' }).click();
    await page.getByRole('link', { name: 'Каталог новостроек' }).click();
    
    await expect(page).toHaveURL(/\/kvartiry\/catalog\/novostroykic/);
    await expect(page.getByTitle('Новостройки')).toBeVisible;
}); 

test('Для неавторизованного пользователя открывается форма автооризации при попытке разместить объявление', async( {page} ) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('https://www.avito.ru/');

    await page.getByRole('link', { name: 'Разместить объявление' }).click();
    
    await expect(page).toHaveURL(/login/);
    await expect(page.locator('[data-marker="top-rubricator/all-categories"]')).toBeVisible;
}); 

test('При нажатии на кнопку Заказать звонок, открывается формы заказа звонка', async( {page} ) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('https://www.avito.ru/');

    await page.getByRole('button', { name: 'Для бизнеса' }).click();
    await page.getByRole('link', { name: 'Продавать' }).click();
    
    await expect(page).toHaveURL(/business/);
    await expect(page.getByText('Ведите бизнес на Авито')).toBeVisible;

    await expect(page.locator('.d066dd03fe098c4b')).toBeVisible;
}); 

test('При выборе региона показываются объявления из этого региона', async( {page} ) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('https://www.avito.ru/');

    await page.locator('.styles-module-icon-iiyd6').click();
    await page.locator('.styles-module-closeIcon-TKFIs').click();
    await page.getByRole('button', { name: 'Каталоги' }).click();
    await page.getByLabel('закрыть').click();
    await page.getByPlaceholder('Город или регион').fill('Москва');
    await page.getByRole('checkbox', { name: 'Москва' }).click();
    await page.getByRole('button', { name: 'Показать больше 1 тыс. объявлений' }).click();
    
    await expect(page.locator('span:has-text("Москва")')).toBeVisible;
}); 
import { test, expect } from '@playwright/test';
import { DEFAULT_OPTIONS, CUSTOM_OPTION } from '../src/Picker/constant';

const URL = 'http://localhost:3000';

const DROPDOWN = '.ant-dropdown-trigger';
const DROPDOWN_MENU = '.ant-dropdown-menu';

const OPTIONS = [...DEFAULT_OPTIONS, CUSTOM_OPTION];
const DEFAULT_VALUE = OPTIONS[2];

const OPTIONS_LABELS = OPTIONS.map((item) => item.label).reduce(
  (acc, label) => acc + `${label}`,
  ''
);

test.describe('Main functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test('Dropdown default value', async ({ page }) => {
    const dropdown = page.locator(DROPDOWN);

    await expect(dropdown).toBeInViewport();
    await expect(dropdown).toHaveText(DEFAULT_VALUE.label);
  });

  test('Dropdown hover', async ({ page }) => {
    const dropdown = page.locator(DROPDOWN);

    await expect(dropdown).toHaveCSS('cursor', 'default');

    await dropdown.hover();
    await expect(dropdown).toHaveCSS('cursor', 'pointer');
  });

  test('Dropdown menu', async ({ page }) => {
    const dropdown = page.locator(DROPDOWN);

    await dropdown.click();

    const dropdownMenu = page.locator(DROPDOWN_MENU);

    await expect(dropdownMenu).toBeInViewport();
    await expect(dropdownMenu).toHaveText(OPTIONS_LABELS);
  });

  // test('Hover dropdown menu items', async ({ page }) => {});

  // test('Select dropdown menu items', async ({ page }) => {});

  // test('Open date picker', async ({ page }) => {});

  // test('Hover date picker start date', async ({ page }) => {});

  // test('Hover date picker end date', async ({ page }) => {});

  // test('Focus date picker start date', async ({ page }) => {});

  // test('Focus date picker end date', async ({ page }) => {});

  // test('Select date picker start date', async ({ page }) => {});

  // test('Select date picker end date', async ({ page }) => {});

  // test('Disable date picker start date', async ({ page }) => {});

  // test('Disable date picker end date', async ({ page }) => {});

  // test('Blur date picker', async ({ page }) => {});

  // test('Clear date picker', async ({ page }) => {});

  // test('Close date picker', async ({ page }) => {});
});

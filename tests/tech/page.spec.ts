import { test, expect } from '@playwright/test';

test.describe('PostPage', () => {
  // Mock API route for markdown
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/md**', async route => {
      const url = new URL(route.request().url());
      const path = url.searchParams.get('path');
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          content: `# Hello World\nThis is a test markdown for: ${path}`,
        }),
      });
    });
  });

  test('renders markdown content from API', async ({ page }) => {
    await page.goto('/tech/hello-world');

    // Expect fetch triggered and markdown to appear
    await expect(page.locator('article')).toContainText('Hello World');
    await expect(page.locator('article')).toContainText('This is a test markdown');
  });

  test('changes language attribute dynamically', async ({ page }) => {
    await page.goto('/tech/hello-world');

    // Wait until markdown is loaded
    await expect(page.locator('article')).toContainText('Hello World');

    // Check the <html> lang attribute updated
    const lang = await page.evaluate(() => document.documentElement.lang);
    expect(lang).toBe('en');
  });
});

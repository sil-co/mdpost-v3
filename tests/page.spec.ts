import { test, expect } from '@playwright/test';

test.describe('Top page redirect', () => {
  test('redirects from / to /tech-blog', async ({ page }) => {
    // Navigate to the top page
    await page.goto('/');

    // Wait until navigatin finishes
    await page.waitForLoadState('networkidle');

    // Ensure the user ends up on /tech-blog
    const currentUrl = page.url();
    expect(currentUrl).toMatch(/\/tech-blog(\/.*)?$/);

    // Verify the layout wrapper exists (from layout.tsx)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('body')).toHaveClass(/antialiased/);
  });
});

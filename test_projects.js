const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Load local projects.html
  const filePath = `file://${path.resolve(__dirname, 'public/projects.html')}`;

  // Desktop test
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(filePath);
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'projects-desktop.png', fullPage: true });

  // Mobile test
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(filePath);
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'projects-mobile.png' });

  // Test search on mobile
  await page.fill('#projects-search-input', 'چمپینگ');
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'projects-mobile-search.png' });

  await browser.close();
  console.log('Screenshots generated successfully!');
})();

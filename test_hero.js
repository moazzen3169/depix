const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const filePath = `file://${path.resolve(__dirname, 'public/index.html')}`;

  // 1. Desktop Dark Mode
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(filePath);
  await page.waitForTimeout(500);

  // Screenshot Section 1 (Text Hero)
  await page.screenshot({ path: 'hero-section1-desktop-dark.png' });

  // Scroll to Section 2 (Bento Hero)
  await page.evaluate(() => {
    document.getElementById('hero-bento').scrollIntoView();
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'hero-section2-desktop-dark.png' });

  // 2. Desktop Light Mode
  await page.click('#theme-toggle');
  await page.waitForTimeout(300);

  // Scroll back to Section 1
  await page.evaluate(() => {
    document.getElementById('hero').scrollIntoView();
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'hero-section1-desktop-light.png' });

  // Scroll to Section 2
  await page.evaluate(() => {
    document.getElementById('hero-bento').scrollIntoView();
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'hero-section2-desktop-light.png' });

  // 3. Mobile Dark Mode
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(filePath);
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'hero-section1-mobile-dark.png' });

  await page.evaluate(() => {
    document.getElementById('hero-bento').scrollIntoView();
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'hero-section2-mobile-dark.png' });

  await browser.close();
  console.log('Hero section test screenshots generated successfully!');
})();

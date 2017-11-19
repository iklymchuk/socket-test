const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.waitFor(5000);
  
  await page.screenshot({path: 'test/screenshot/example.png'});
  
  await browser.close();
})();
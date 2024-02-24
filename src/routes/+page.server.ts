import type { PageServerLoad } from './$types';

import { chromium } from '@playwright/test';

export const load = (async () => {
  let scrapedData = '';
  const browser = await chromium.launch(
    {
      headless: true,
      args: [
          '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'
      ],
      //devtools: true
  }
  );
  const page = await browser.newPage({ bypassCSP: true });
  await page.goto('https://kick.com/api/v2/channels/jahrein');
  await page.waitForTimeout(1000);
  let playback_url = await page.evaluate(() => {
    const dataElement = document.querySelector('body');
    if (dataElement) {
      const data = dataElement.textContent;
      if (data) {
        const parsedData = JSON.parse(data);
        return parsedData.playback_url;
      }
    }
    return null;
  });
  console.log(playback_url);

  scrapedData = playback_url;

  // Example: Extract text content of an element
  await page.waitForTimeout(1000);
  await browser.close();
  console.log('Scraped Data:', scrapedData); // Add console log to display scraped data
  return { scrapedData };
}) satisfies PageServerLoad;
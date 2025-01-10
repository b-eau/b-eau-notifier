const puppeteer = require('puppeteer');

async function checkParkingAvailability() {
  const browser = await puppeteer.launch({
    headless: 'new', // Use the new Headless mode
    args: ['--no-sandbox', '--disable-setuid-sandbox'] // Required for running in Docker
  });
  const page = await browser.newPage();

  try {
    await page.goto('https://parking.crystalmountainresort.com/');
    await page.waitForSelector('#calendar', { timeout: 10000 });

    const targetDate = process.env.TARGET_DATE || '2025-01-11';
    const isAvailable = await page.evaluate((date) => {
      const els = document.querySelectorAll(`.fc-available`);
      for (const el of els) {
        const dateAttr = el.getAttribute('data-date');
        if (dateAttr && dateAttr.startsWith(date)) {
            return true;
        }
      }
      return false;
    }, targetDate);

    if (isAvailable) {
      console.log(`Parking is available on ${targetDate}`);
    } else {
      console.log(`Parking is NOT available on ${targetDate}`);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await browser.close();
  }
}

checkParkingAvailability();

import faker from "faker";
import puppeteer from "puppeteer";

const APP = 'https://logicleee.github.io/test/form.html';

const lead = {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  message: faker.random.words()
}

let page, browser;
const width = 1280;
const height = 800;

beforeAll (async () => {
  browser = await puppeteer.launch({
    headless: true,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.setViewport({width, height});
});

afterAll (() => {
  browser.close();
});

describe('Mock contact form', () => {
  test('can submit a contact request', async () => {
    await page.goto(APP)
    await page.waitFor(3000)
    await page.screenshot({path: 'screenshot-before.png'});
    //console.log('divs', await page.$$eval('div', divs => divs.length));
    await page.waitForSelector("[data-test=contact]")
    await page.click("input[name=name]")
    await page.type("input[name=name]", lead.name)
    await page.click("input[name=email]")
    await page.type("input[name=email]", lead.email)
    await page.click("input[name=tel]")
    await page.type("input[name=tel]", lead.phone)
    await page.click("textarea[name=message]")
    await page.type("textarea[name=message]", lead.message)
    await page.click("input[type=checkbox]")
    //await page.click("button[type=submit]")
    await page.screenshot({path: 'screenshot-after.png'});
  });
});

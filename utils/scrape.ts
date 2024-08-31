import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";

export const paparScript = async (
  URL: string,
  folder: string,

  title: string,
  desc: string,
  image: string,
  url: string,
  date: string
) => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  try {
    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: "load" });

    await page.waitForTimeout(2000);

    const scroll = async () => {
      await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
      });
    };

    for (let i: number = 0; i <= 20; i++) {
      scroll();
      await page.waitForTimeout(2000);
    }

    const data = await page.evaluate(() => {
      const data = Array.from(document.querySelectorAll("article"));

      return data.map((props) => ({
        title: props.querySelector(title)?.textContent,
        url: props.querySelector(url)?.getAttribute("href"),
        desc: props.querySelector(desc)?.textContent,
        img: props.querySelector(image)?.getAttribute("src"),
        date: props.querySelector(date)?.textContent,
      }));
    });

    console.log(data);

    fs.writeFile(
      path.join(__dirname, folder, `./data.json`),
      JSON.stringify(data),
      () => {
        console.log();
        console.log("done scraping");
      }
    );
  } catch (error) {
    console.log(error);
  } finally {
    await browser.close();

    console.log("done");
  }
};

export const newScrape = async (
  URL: string,
  folder: string,
  title: string,
  date: string,
  image: string
) => {
  const browser = await puppeteer.launch({ headless: false });
  try {
    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: "load" });

    const data = await page.evaluate(() => {
      const data = Array.from(document.querySelectorAll("a"));

      return data.map((props) => ({
        title: props.querySelector(title)?.textContent,
        date: props.querySelector(date)?.textContent,
        url: props.querySelector("a")?.getAttribute("href"),
        img: props.querySelector(image)?.getAttribute("src"),
      }));
    });

    console.log(data);

    fs.writeFile(
      path.join(__dirname, folder, `./data.json`),
      JSON.stringify(data),
      () => {
        console.log();
        console.log("done scraping");
      }
    );
  } catch (error) {
    console.log(error);
  } finally {
    console.log();
    await browser.close();
    console.log("done");
  }
};

//   "span:nth-child(1)"
//   "img.archive-grid-single-img.st"

// desc: ".post-excerpt"
// image: ".post-image.st"
// url: "h1 a"
// date: "div span.post-date"

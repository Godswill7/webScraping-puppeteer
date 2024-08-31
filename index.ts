import express, { Application, Request, Response } from "express";
import cors from "cors";
import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
// import { paparScript } from "./utils/scrape";

const app: Application = express();
// const URL: string = "https://www.google.com/";
// const URL: string = "https://dribbble.com/";
// const URL: string = "https://punchng.com/topics/news/";
const URL: string = "https://www.jumia.com.ng/womens-bags/";
// const URL: string = "https://sunnewsonline.com/category/national/";

app.use(cors());
app.use(express.json());

// const mainScript = async () => {
//   const browser = await puppeteer.launch({ headless: false });

//   try {
//     const page = await browser.newPage();
//     await page.goto(URL, { waitUntil: "load" });

//     await page.waitForTimeout(1000);

//     const scrollDown = async () => {
//       await page.evaluate(() => {
//         window.scrollBy(0, window.innerHeight);
//       });
//     };

//     for (let i: number = 0; i <= 14; i++) {
//       await scrollDown();
//       await page.waitForTimeout(2000);
//     }

//     await page.screenshot({
//       path: path.join(
//         __dirname,
//         "images",
//         `./dribbbleFull${Math.floor(Math.random() * 1000) + Date.now()}.png`
//       ),
//       fullPage: true,
//     });
//   } catch (error) {
//     console.log(error);
//   } finally {
//     console.log();
//     await browser.close();
//     console.log("I'm done scraping: ⭐⭐🚀🚀 ");
//   }
// };

// desc: ".post-excerpt"
// image: ".post-image.st"
// url: "h1 a"
// date: "div span.post-date"

// const paparScript = async () => {
//   let savedData: Array<{}> = [];
//   const browser = await puppeteer.launch({
//     headless: false,
//   });
//   try {
//     const page = await browser.newPage();
//     await page.goto("https://punchng.com/topics/news/", { waitUntil: "load" });

//     await page.waitForTimeout(2000);

//     const scroll = async () => {
//       await page.evaluate(() => {
//         window.scrollBy(0, window.innerHeight);
//       });
//     };

//     for (let i: number = 0; i <= 20; i++) {
//       scroll();
//       await page.waitForTimeout(2000);
//     }

//     const data = await page.evaluate(() => {
//       const data = Array.from(document.querySelectorAll("article"));

//       return data.map((props) => ({
//         title: props.querySelector("h1")?.textContent,
//         url: props.querySelector("h1 a")?.getAttribute("href"),
//         desc: props.querySelector(".post-excerpt")?.textContent,
//         img: props.querySelector(".post-image.st")?.getAttribute("src"),
//         date: props.querySelector("div span.post-date")?.textContent,
//       }));
//     });

//     fs.writeFile(
//       path.join(__dirname, "scrapedData", `./data.json`),
//       JSON.stringify(data),
//       () => {
//         console.log();
//         console.log("done scraping");
//       }
//     );
//   } catch (error) {
//     console.log(error);
//   } finally {
//     await browser.close();

//     console.log("done");
//   }
// };

// const paparScriptII = async () => {
//   const browser = await puppeteer.launch({
//     headless: false,
//   });
//   try {
//     const page = await browser.newPage();
//     await page.goto("https://sunnewsonline.com/category/national/", {
//       waitUntil: "load",
//     });

//     await page.waitForTimeout(2000);

//     const scroll = async () => {
//       await page.evaluate(() => {
//         window.scrollBy(0, window.innerHeight);
//       });
//     };

//     // for (let i: number = 0; i <= 20; i++) {
//     //   scroll();
//     //   await page.waitForTimeout(2000);
//     // }

//     const data = await page.evaluate(() => {
//       const data = Array.from(document.querySelectorAll("a"));

//       return data.map((props) => ({
//         title: props.querySelector("h3")?.textContent,
//         img: props
//           .querySelector("img.archive-grid-single-img.st")
//           ?.getAttribute("src"),
//         date: props.querySelector("span:nth-child(1)")?.textContent,
//       }));
//     });

//     fs.writeFile(
//       path.join(__dirname, "scrapedData", `./data.json`),
//       JSON.stringify(data),
//       () => {
//         console.log();
//         console.log("done scraping");
//       }
//     );
//   } catch (error) {
//     console.log(error);
//   } finally {
//     await browser.close();

//     console.log("done");
//   }
// };

// ;
// paparScriptII();

async function ourBrowser(
  article: string
  //   title: string,
  //   image: string,
  //   rating: string,
  //   url: string
) {
  const browser = await puppeteer.launch({ headless: false });
  try {
    const page = await browser.newPage();
    await page.goto(URL);

    const scrollDown = async () => {
      await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
      });
    };

    for (let i: number = 0; i <= 14; i++) {
      await scrollDown();
      await page.waitForTimeout(500);
    }

    const data = await page.evaluate((URL:string) => {
      const helper = (data: string) => {
        return parseFloat(data);
      };

      const data = Array.from(document.querySelectorAll(article));
      return data.map((props) => ({
        title: props.querySelector("h3")?.textContent,
        img: props.querySelector("img")?.getAttribute("src"),
        rating: helper(
          props.querySelector("a")?.getAttribute("data-dimension27")!
        ),
        url: URL + props.querySelector("a")?.getAttribute("href"),
      }));
    }, URL);

    console.log(data);
    console.log("Article: ", article);
  } catch (error:any) {
    console.log(error.message);
  } finally {
    console.log("done");
    await browser.close();
  }
}

ourBrowser(
  "article"
  //  "h3",
  //  "img",
  //  "a",
  //  "a"
);
app.get("/", (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      message: "set07 web scraping class",
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
});

app.listen(3377, () => {
  console.log();
  console.log("server connected...🚀🚀🚀");
});

// #category-page > div > section > div > div.col-lg-9 > div.latest-news-timeline-section > article:nth-child(2) > div > span

// body > content > div > div:nth-child(2) > div.col-lg-12.col-xl-9 > div.row > div.col-lg-12 > div > a:nth-child(3)

// body > content > div > div:nth-child(2) > div.col-lg-12.col-xl-9 > div.row > div.col-lg-12 > div > a:nth-child(1)

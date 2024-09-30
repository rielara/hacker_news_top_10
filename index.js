const { chromium } = require("playwright");
const fs = require("fs");

async function saveHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://news.ycombinator.com");

  const articles = await page.evaluate(() => {
    const articles = [];
    const titleElements = document.querySelectorAll(".titleline");

    titleElements.forEach((element, index) => {
      const titleElement = element.querySelector("a") || element;
      let title = titleElement.innerText.trim();
      const url = titleElement.href || "";

      if (index < 20) {
        articles.push({ index: index + 1, title, url });
      }
    });

    return articles;
  });

  const csvData = articles
    .map((article) => `"${article.title}", ${article.url}`)
    .join("\n");
  fs.writeFileSync("hacker_news_top_10.csv", csvData);
  console.log("Data saved to hacker_news_top_10.csv");

  await browser.close();
}

(async () => {
  await saveHackerNewsArticles();
})();

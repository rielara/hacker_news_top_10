const { test, expect } = require("@playwright/test");

//Testing user visible behavior
// Make tests as isolated as possible (improves reproducibility), makes debugging easier and prevents cascading test failures.

test("Go to HackerNews", async ({ page }) => {
  await page.goto("https://news.ycombinator.com");
  const name = await page.innerText(".hnname");
  expect(name).toBe("Hacker News");
});

// the page has articles with titles
test("The page has a list of titles", async ({ page }) => {
  const titleLocator = page.locator(".title");
  titleLocator.filter({ hasText: "1." });
});

// the page has at least 10 articles
test("The page has at least 10 articles", async ({ page }) => {
    
  const articleCount = await page.$$eval(".rank", (elements) => elements.length);
  expect(articleCount).toBeLessThanOrEqual(10);

});



import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:5173";

test("Test 3: should load dog image successfully when page is opened", async ({ page }) => {
  const responsePromise = page.waitForResponse(
    (response) =>
      response.url().includes("/api/dogs/random") && response.status() === 200
  );

  await page.goto(BASE_URL);
  await responsePromise;

  const image = page.locator("img");
  const src = await image.getAttribute("src");

  expect(src).toBeTruthy();
  expect(src).toMatch(/^https:\/\//);
});

test("Test 4: should load dog image successfully when button is clicked", async ({ page }) => {
  await page.goto(BASE_URL);

  const button = page.getByRole("button");

  const responsePromise = page.waitForResponse(
    (response) =>
      response.url().includes("/api/dogs/random") && response.status() === 200
  );

  await button.click();
  await responsePromise;

  const image = page.locator("img");
  const src = await image.getAttribute("src");

  expect(src).toBeTruthy();
  expect(src).toMatch(/^https:\/\//);
});

test("Test 5: should show error message when API call fails", async ({ page }) => {
  await page.route("**/api/dogs/random", async (route) => {
    await route.abort();
  });

  await page.goto(BASE_URL);

  await expect(page.getByText(/error/i)).toBeVisible();
});
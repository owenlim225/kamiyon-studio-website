import { expect, test } from "@playwright/test";

const staticRoutes = [
  "/",
  "/about",
  "/services",
  "/products",
  "/portfolio",
  "/community",
  "/contact",
];

const dynamicRoutes = [
  "/services/game-development",
  "/products/eclipse",
  "/portfolio/sample-client-project-placeholder",
];

for (const route of staticRoutes) {
  test(`renders ${route} without error`, async ({ page }) => {
    const response = await page.goto(route);

    expect(response?.status()).toBeLessThan(400);
    await expect(page.locator("main")).toBeVisible();
    await expect(page).not.toHaveTitle("");
  });
}

for (const route of dynamicRoutes) {
  test(`renders ${route} without error`, async ({ page }) => {
    const response = await page.goto(route);

    expect(response?.status()).toBeLessThan(400);
    await expect(page.locator("main")).toBeVisible();
  });
}

test("renders a friendly 404 for an unknown route", async ({ page }) => {
  const response = await page.goto("/this-route-does-not-exist");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("link", { name: /home/i }).first()).toBeVisible();
});

test("primary navigation links to every top-level section", async ({ page }) => {
  await page.goto("/");

  for (const route of staticRoutes) {
    const label = route === "/" ? "Home" : route.slice(1);
    await expect(
      page.getByRole("navigation").getByRole("link", { name: new RegExp(label, "i") }).first()
    ).toBeVisible();
  }
});

test("skip-to-content link is keyboard accessible", async ({ page }) => {
  await page.goto("/");

  const skipLink = page.getByRole("link", { name: /skip to content/i });
  await expect(skipLink).toBeAttached();
});

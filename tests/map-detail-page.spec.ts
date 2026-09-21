import { test, expect } from "@playwright/test"

test.describe("map detail page", () => {
  test("loads detail page by URL", async ({ page }) => {
    await page.goto("/map/101")

    await expect(page.getByTestId("map-detail-page")).toBeVisible()
    await expect(page.getByRole("heading", { name: "Alpha Arena" })).toBeVisible()
  })

  test("shows not found for invalid id", async ({ page }) => {
    await page.goto("/map/9999")

    await expect(page.getByTestId("map-detail-not-found")).toBeVisible()
    await expect(page.getByRole("heading", { name: "Sportoviště nenalezeno" })).toBeVisible()
  })

  test("renders nearest stops and external links", async ({ page }) => {
    await page.goto("/map/101")

    const nearestStops = page.getByTestId("map-nearest-stops")
    await expect(nearestStops).toBeVisible()

    await expect(page.getByTestId("public-transport-card").first()).toBeVisible()

    await expect(page.getByRole("link", { name: "IDOS" }).first()).toBeVisible()
    await expect(page.getByRole("link", { name: "Google Maps" }).first()).toBeVisible()
    await expect(page.getByRole("link", { name: "Mapy.cz" }).first()).toBeVisible()
  })
})

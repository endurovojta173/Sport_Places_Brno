import { test, expect } from "@playwright/test"

test.describe("map page", () => {
  test("shows loading state on client navigation", async ({ page }) => {
    await page.goto("/")

    await page
      .getByRole("main")
      .getByRole("link", { name: "Zobrazit mapu" })
      .click()

    await expect(page).toHaveURL(/\/map$/)
    await expect(page.getByTestId("map-loading")).toBeVisible({ timeout: 5000 })
  })

  test("renders map container and controls", async ({ page }) => {
    await page.goto("/map")

    await expect(page.getByTestId("map-page")).toBeVisible()
    await expect(page.getByTestId("map-container")).toBeVisible()
    await expect(page.locator(".leaflet-container")).toBeVisible({ timeout: 10000 })

    const searchInput = page.getByTestId("map-search")
    await searchInput.fill("test")
    await expect(searchInput).toHaveValue("test")

    await page.getByTestId("map-type-select").click()
    await expect(page.getByRole("option").first()).toBeVisible()

    await expect(page.getByTestId("map-results-count")).toBeVisible()
  })
})

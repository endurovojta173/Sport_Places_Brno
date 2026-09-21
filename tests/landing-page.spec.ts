import { test, expect } from "@playwright/test"

test.describe("landing page", () => {
  test("renders hero and stats", async ({ page }) => {
    await page.goto("/")
    await expect(
      page.getByRole("heading", { name: "Sportoviště města Brna" })
    ).toBeVisible()
    await expect(page.getByText("Sportovišť v Brně")).toBeVisible()
  })

  test("navigation CTAs go to map and favorites", async ({ page }) => {
    await page.goto("/")

    await page.getByRole("link", { name: "Zobrazit mapu" }).click()
    await expect(page).toHaveURL(/\/map$/)

    await page.goto("/")
    await page.getByRole("main").getByRole("link", { name: "Oblíbené" }).click()
    await expect(page).toHaveURL(/\/favorites$/)
  })
})

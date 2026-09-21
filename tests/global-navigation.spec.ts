import { test, expect } from "@playwright/test"

test.describe("global navigation", () => {
  test("desktop nav highlights active route and links work", async ({ page }) => {
    await page.goto("/map")

    const desktopNav = page.locator("header nav").first()
    await expect(desktopNav).toBeVisible()

    const activeMapLink = desktopNav.getByRole("link", { name: "Mapa" })
    await expect(activeMapLink).toHaveClass(/bg-primary/)
    await expect(activeMapLink).toHaveClass(/text-white/)

    await desktopNav.getByRole("link", { name: "Seznam" }).click()
    await expect(page).toHaveURL(/\/list$/)

    const activeListLink = desktopNav.getByRole("link", { name: "Seznam" })
    await expect(activeListLink).toHaveClass(/bg-primary/)
  })

  test("mobile nav toggles and routes correctly", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto("/")

    const desktopNav = page.locator("header nav").first()
    await expect(desktopNav).toBeHidden()

    const menuToggle = page.locator('button[aria-controls="mobile-nav"]')
    await expect(menuToggle).toHaveAttribute("aria-expanded", "false")

    await menuToggle.click()
    await expect(menuToggle).toHaveAttribute("aria-expanded", "true")

    const mobileNav = page.locator("#mobile-nav nav")
    await expect(mobileNav).toBeVisible()

    await mobileNav.getByRole("link", { name: "Oblíbené" }).click()
    await expect(page).toHaveURL(/\/favorites$/)

    await expect(menuToggle).toHaveAttribute("aria-expanded", "false")
  })
})

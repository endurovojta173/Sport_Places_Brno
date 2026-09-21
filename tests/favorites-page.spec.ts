import { test, expect } from "@playwright/test"

const sportPlacesFixture = {
  features: [
    {
      attributes: {
        ObjectId: 101,
        nazev: "Hokejová aréna",
        typ_sportoviste_nazev: "Hokej",
        adresa: "Kounicova 1",
        kategorie: "Hala",
      },
      geometry: { x: 16.6, y: 49.2 },
    },
    {
      attributes: {
        ObjectId: 102,
        nazev: "Lezecké centrum",
        typ_sportoviste_nazev: "Lezení",
        adresa: "Veveří 2",
        kategorie: "Hala",
      },
      geometry: { x: 16.4, y: 49.25 },
    },
  ],
}

const transportFixture = {
  features: [
    {
      attributes: {
        stop_id: 10,
        stop_name: "Aréna",
        latitude: 49.2005,
        longitude: 16.6005,
        zone_id: 100,
        location_type: 0,
        wheelchair_boarding: 1,
        platform_code: "1",
      },
    },
    {
      attributes: {
        stop_id: 20,
        stop_name: "Centrum",
        latitude: 49.2505,
        longitude: 16.4005,
        zone_id: 101,
        location_type: 0,
        wheelchair_boarding: 1,
        platform_code: "2",
      },
    },
  ],
}

test.describe("favorites page", () => {
  test.beforeEach(async ({ page }) => {
    await page.route(
      /services6\.arcgis\.com\/fUWVlHWZNxUvTUh8\/arcgis\/rest\/services\/sportoviste\/FeatureServer\/0\/query/,
      async (route) => {
        await route.fulfill({ json: sportPlacesFixture })
      }
    )

    await page.route(
      /services6\.arcgis\.com\/fUWVlHWZNxUvTUh8\/arcgis\/rest\/services\/stops\/FeatureServer\/0\/query/,
      async (route) => {
        await route.fulfill({ json: transportFixture })
      }
    )
  })

  test("favorites persist across navigation and refresh", async ({ page }) => {
    await page.goto("/list")

    const firstFavoriteButton = page
      .getByRole("button", { name: "Přidat do oblíbených" })
      .first()
    await firstFavoriteButton.click()
    await expect(
      page.getByRole("button", { name: "Odebrat z oblíbených" }).first()
    ).toBeVisible()

    await page.goto("/favorites")
    await expect(page.getByRole("heading", { name: "Oblíbené" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Hokejová aréna" })).toBeVisible()

    await page.reload()
    await expect(page.getByRole("heading", { name: "Hokejová aréna" })).toBeVisible()

    await page.goto("/list")
    await page
      .getByRole("banner")
      .getByRole("link", { name: "Oblíbené" })
      .click()
    await expect(page.getByRole("heading", { name: "Hokejová aréna" })).toBeVisible()
  })

  test("toggling favorites updates the page", async ({ page }) => {
    await page.goto("/list")

    await page
      .getByRole("button", { name: "Přidat do oblíbených" })
      .first()
      .click()
    await expect(
      page.getByRole("button", { name: "Odebrat z oblíbených" }).first()
    ).toBeVisible()

    await page.goto("/favorites")
    await expect(page.getByRole("heading", { name: "Hokejová aréna" })).toBeVisible()

    await page
      .getByRole("button", { name: "Odebrat z oblíbených" })
      .first()
      .click()
    await expect(
      page.getByText("Zatím nemáte žádná oblíbená sportoviště.")
    ).toBeVisible()
  })

  test("favorite state syncs across list and detail pages", async ({ page }) => {
    await page.goto("/list")

    const firstFavoriteButton = page
      .getByRole("button", { name: "Přidat do oblíbených" })
      .first()
    await firstFavoriteButton.click()
    await expect(
      page.getByRole("button", { name: "Odebrat z oblíbených" }).first()
    ).toBeVisible()

    await page.goto("/map/101")
    const detailFavoriteButton = page.getByRole("button", { name: "Odebrat z oblíbených" })
    await expect(detailFavoriteButton).toBeVisible()

    await page.reload()
    await expect(page.getByRole("button", { name: "Odebrat z oblíbených" })).toBeVisible()

    await detailFavoriteButton.click()
    await expect(page.getByRole("button", { name: "Přidat do oblíbených" })).toBeVisible()

    await page.goto("/list")
    await expect(
      page.getByRole("button", { name: "Přidat do oblíbených" }).first()
    ).toBeVisible()
  })
})

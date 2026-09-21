import { test, expect } from "@playwright/test"

const sportPlacesFixture = {
  features: [
    {
      attributes: {
        ObjectId: 1,
        nazev: "Hokejová aréna",
        typ_sportoviste_nazev: "Hokej",
        adresa: "Kounicova 1",
        kategorie: "Hala",
      },
      geometry: { x: 16.6, y: 49.2 },
    },
    {
      attributes: {
        ObjectId: 2,
        nazev: "Lezecké centrum",
        typ_sportoviste_nazev: "Lezení",
        adresa: "Veveří 2",
        kategorie: "Hala",
      },
      geometry: { x: 16.4, y: 49.25 },
    },
  ],
}

const publicTransportFixture = {
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

test.describe("list page", () => {
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
        await route.fulfill({ json: publicTransportFixture })
      }
    )
  })

  test("loads list page", async ({ page }) => {
    await page.goto("/list")
    await expect(page.getByRole("heading", { name: "Sportoviště" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Hokejová aréna" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Lezecké centrum" })).toBeVisible()
  })

  test("filtering by type and zone changes results", async ({ page }) => {
    await page.goto("/list")

    await page.getByTestId("list-type-select").click()
    await page.getByRole("option", { name: "Hokej" }).click()
    await expect(page.getByRole("heading", { name: "Hokejová aréna" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Lezecké centrum" })).toBeHidden()

    await page.getByTestId("list-zone-select").click()
    await page.getByRole("option", { name: "100" }).click()
    await expect(page.getByRole("heading", { name: "Hokejová aréna" })).toBeVisible()

    await page.getByTestId("list-zone-select").click()
    await page.getByRole("option", { name: "101" }).click()
    await expect(page.getByRole("heading", { name: "Hokejová aréna" })).toBeHidden()
  })

  test("shows empty-results message", async ({ page }) => {
    await page.goto("/list")
    await page.getByTestId("list-zone-select").click()
    await page.getByRole("option", { name: "410" }).click()
    await expect(
      page.getByText("Žádná sportoviště neodpovídají filtrům.")
    ).toBeVisible()
  })
})

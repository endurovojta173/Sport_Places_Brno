import { test, expect } from "@playwright/test"

test.describe("filtered map container", () => {
  test("search suggestions and keyboard navigation", async ({ page }) => {
    await page.goto("/map")

    const searchInput = page.getByTestId("map-search")
    await searchInput.fill("par")

    const suggestions = page.getByTestId("map-suggestions")
    await expect(suggestions).toBeVisible()

    await searchInput.press("ArrowDown")
    const firstSuggestion = page.getByTestId("map-suggestion-item").first()
    await expect(firstSuggestion).toHaveAttribute("data-active", "true")

    await searchInput.press("ArrowDown")
    const secondSuggestion = page.getByTestId("map-suggestion-item").nth(1)
    await expect(secondSuggestion).toHaveAttribute("data-active", "true")

    await searchInput.press("ArrowUp")
    await expect(firstSuggestion).toHaveAttribute("data-active", "true")

    const targetTitle = await firstSuggestion.getAttribute("data-suggestion-title")
    const targetId = await firstSuggestion.getAttribute("data-suggestion-id")
    const targetLat = await firstSuggestion.getAttribute("data-suggestion-lat")
    const targetLng = await firstSuggestion.getAttribute("data-suggestion-lng")

    await searchInput.press("Enter")

    await expect(suggestions).toBeHidden()
    await expect(searchInput).toHaveValue(targetTitle ?? "")

    const mapContainer = page.getByTestId("map-container")
    await expect(mapContainer).toHaveAttribute(
      "data-selected-place-id",
      targetId ?? ""
    )
    await expect(mapContainer).toHaveAttribute(
      "data-selected-center-lat",
      targetLat ?? ""
    )
    await expect(mapContainer).toHaveAttribute(
      "data-selected-center-lng",
      targetLng ?? ""
    )

    await searchInput.fill("par")
    await expect(suggestions).toBeVisible()
    await searchInput.press("Escape")
    await expect(suggestions).toBeHidden()
  })

  test("type filtering updates result count", async ({ page }) => {
    await page.goto("/map")

    const count = page.getByTestId("map-results-count")
    await expect(count).toContainText("4")

    await page.getByTestId("map-type-select").click()
    await page.getByRole("option", { name: "Park" }).click()

    await expect(count).toContainText("2")
  })
})

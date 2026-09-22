# Sport Brno 🏀

An interactive web application for searching and discovering sports facilities in the statutory city of Brno. The project uses open data from the city of Brno to display sports facilities on a map, find the nearest public transport stops, and allow users to save their favorite places. You can try it out [here](endurovojta173.github.io/Sport_Places_Brno/)

## 🚀 Key Features

- **Interactive Map:** Displays all available sports facilities in Brno using a map (Leaflet).
- **Smart Search & Filtering:** Search for sports facilities by name (diacritic-insensitive) and filter by sport type.
- **Facility Details:** Detailed information including address, website, and the nearest public transport stops (with walking distance).
- **List View:** An alternative view of sports facilities as a list with advanced filtering (including filtering by IDS JMK transport zones).
- **Favorites:** Save your favorite sports facilities for quick access later (saved locally on your device).

## 🛠️ Technology Stack

The project is built on a modern frontend stack:

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/), Lucide React (icons)
- **Map:** [React Leaflet](https://react-leaflet.js.org/) with OpenStreetMap tiles
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) (for managing favorites)
- **Data Fetching:** [SWR](https://swr.vercel.app/) / native fetch API
- **Containerization:** Docker & Docker Compose
- **Testing:** Playwright

## 📦 Data Sources

The application fetches up-to-date information via the [ArcGIS REST API](https://developers.arcgis.com/rest/) from the Open Data portal of the city of Brno (data.brno.cz):
- Database of sports facilities in Brno
- Database of public transport stops (IDS JMK)

---

## 💻 Running the Project (Local Development)

The project can be run easily using Docker or traditionally via Node.js.

### Option 1: Using Docker (Recommended)

1. Make sure you have **Docker Desktop** installed and running.
2. For the first start and to build the containers, run in the project root:
   ```bash
   docker compose up --build
   ```
3. For subsequent starts, you only need to run:
   ```bash
   docker compose up
   ```
4. The application will run at `http://localhost:3000`.

*Note: If you encounter an issue with missing packages, remove the container and rebuild it:*
```bash
docker compose down -v
docker compose up --build
```

### Option 2: Locally via Node.js

1. Make sure you have Node.js installed (version 20 or higher recommended).
2. Install all required dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000` in your web browser.

---

## 🚀 Deployment

The project is prepared for deployment as a Static Export. The code includes a GitHub Actions workflow (`.github/workflows/nextjs.yml`) for automatic building and deployment to **GitHub Pages** upon pushing new code to the `main` or `master` branch.

The application fully supports running in a repository subdirectory (e.g., `/Sport_Places_Brno`) thanks to the correct configuration of the `basePath` property in the `next.config.ts` file.

---

## 📜 License & Authors

Created as part of a university school project (WAF LS2025/2026) by Vojtěch Břenek & Matěj Peš. The data source is [data.brno.cz](https://data.brno.cz), which is provided under the CC BY 4.0 license.

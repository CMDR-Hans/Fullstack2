# Copilot instructions for Sonido Vivo React

## Project shape
- This is a Vite + React 19 storefront app for a music/equipment shop.
- `src/main.jsx` is the app entry; it wraps `App` in `BrowserRouter` and imports Bootstrap CSS plus `src/App.css`.
- `src/App.jsx` owns the router: `/`, `/productos`, and a wildcard redirect back to home.
- Page composition is mostly view-first: `src/views/*.jsx` assemble shared layout blocks like `Header`, `Hero`, `Seccion`, and `Footer`.
- The app is static-data driven; there is no API layer or backend. Product/menu content comes from `src/data/*.js`.

## Data flow and architectural patterns
- `src/data/menu.js` exports `itemsMenu`, which is passed into `Header` from multiple views.
- `src/data/productos.js` exports the catalog list used by `src/views/Productos.jsx`.
- `src/views/Productos.jsx` -> `GaleriaProductos` -> `TarjetaProducto` is the canonical product-card flow.
- `src/views/Home.jsx` uses a different dataset (`productosPocho`) and a shorter card variant (`GaleriaPocha` / `TarjetaProductoPocha`).
- Keep the static data objects consistent: product entries normally use `id`, `imagen`, `nombre`, `descripcion`, and `precio`.

## Code conventions specific to this repo
-Prefer small presentational React components; there is no Redux, Zustand, or app-wide state container.
- Reuse `Seccion` for page sections; pass the CSS class through the `clase` prop and `children` for content.
- Use `className`, not `class`, in JSX because React 19 is in use.
- Bootstrap is loaded globally, but most storefront styling lives in `src/App.css`.
- Asset imports are done from `src/assets/...` (images/video) and passed as module imports, not string URLs.

## UI and content patterns
- Navigation labels are in Spanish and live in `src/data/menu.js`; keep labels consistent with current storefront language.
- The app is mostly Spanish-language marketing content. Do not introduce English-only UI text unless explicitly requested.
- Existing routes and links are straightforward anchor-based navigation (`href="/productos"`), not React Router `Link` usage.
- `Header` expects `itemsMenu` as a prop; if you add a new route, update both `App.jsx` and `src/data/menu.js`.

## Workflow
- Run the app: `npm run dev`
- Build for production: `npm run build`
- Lint: `npm run lint`
- Run tests: `npm test -- --run` (Vitest + Testing Library)

## Examples to follow
- `src/components/GaleriaProductos.jsx` maps product rows to cards.
- `src/components/TarjetaProducto.jsx` contains local UI state (`meGusta`) and is a good example of the repo’s simple component-local interactions.
- `src/views/Home.jsx` and `src/views/Productos.jsx` show the expected page composition pattern: shared layout + section + data-driven gallery + footer.

## Important caveat
- This project does not have a backend or API integration; treat additions as front-end-only work unless user requirements clearly add one.
- Avoid over-engineering: the repo favors straightforward static props, small components, and CSS-driven presentation over abstraction layers.

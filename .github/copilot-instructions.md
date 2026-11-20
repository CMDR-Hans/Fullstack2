# Copilot instructions — Sonido Vivo

## Repository shape
- The workspace contains two independently run projects: `SonidoVivoReactFront/` (Vite/React) and `SonidoVivoReactBack/` (Spring Boot/Maven).
- Frontend routes and server integration are separate concerns; do not infer backend types from the static catalog in `src/data/*.js`.
- Backend package root: `cl.duoc.SonidoVivoReact`; API context is `/api/v1` on port `8080`.

## Frontend architecture
- `src/main.jsx` installs `BrowserRouter` and `CartProvider`; `src/App.jsx` declares `/`, `/productos`, and `/admin/clientes` routes.
- Compose pages in `src/views/*.jsx` with shared `Header`, `Seccion`, `Footer`, and route-specific galleries.
- Static marketing/catalog data lives in `src/data/`. `Productos.jsx` maps `productos` through `GaleriaProductos` → `TarjetaProducto`; Home uses `productosPocho` and Pocha cards.
- Cart state is centralized in `src/context/CartContext.jsx` and persisted in `localStorage` under `sonido-vivo-cart`. Use `useCart()` for add/remove/quantity/total behavior; `CartDrawer.jsx` renders the current drawer.
- The cart currently has a finalization button but no checkout API call. The backend has sales endpoints, so implement cross-component integration deliberately rather than assuming checkout already works.
- `src/service/BookService.js` is the sole Axios client (base `http://localhost:8080/api/v1`) and contains legacy `Book*` compatibility aliases for the cliente CRUD used by `BookList.jsx`/`BookForm.jsx`.
- Preserve Spanish UI text and Bootstrap/component conventions. Use `className`, `Header itemsMenu={itemsMenu}`, and `Seccion` `clase`/`children` patterns.

## Backend architecture
- Follow controller → service → repository/JPA layering; controllers return `ResponseEntity`, services own validation/normalization/business rules, and repositories expose Spring Data operations.
- CRUD examples: `ClienteController`/`ClienteService`/`ClienteRepository`, with request/response DTO separation. Prefer the same pattern for new API features.
- `VentaService` deducts stock transactionally, stores each detail's current unit price, and restoring stock is implemented in cancellation; inspect `Venta`/`DetalleVenta` cascade mappings before changing sale deletion or totals.
- Cliente normalization is domain-specific: trim names, lowercase emails, reject duplicate emails, parse Chilean phones with libphonenumber and return E.164 (`+569...`). Keep these rules in `ClienteService`, not controllers.
- Validation errors are centralized in `exception/GlobalExceptionHandler.java`. DTO constraints live in `dto/*` and path IDs require `@Positive`.
- Flyway owns schema evolution: edit/add migrations under `src/main/resources/db/migration/`; JPA is configured with `ddl-auto=validate` against MySQL `sonidoVivo`.

## Database and integration setup
- Backend config is local-only in `application.properties`: MySQL `localhost:3306/sonidoVivo`, username `root`, empty password. Run with MySQL available before service/controller tests that load JPA context.
- CORS allows `localhost:5173` and `localhost:3000`; Swagger is at `http://localhost:8080/api/v1/swagger-ui.html` and the OpenAPI JSON at `/api/v1/api-docs`.
- Product fields persisted by the backend are `id`, `nombre`, `precio`, `stock`; frontend static products use `id`, `imagen`, `nombre`, `descripcion`, `precio` and are not automatically synced.

## Developer workflows
- Frontend: `cd SonidoVivoReactFront; npm install; npm run dev` (5173), `npm run build`, `npm run lint`, `npm test -- --run`.
- Backend: `cd SonidoVivoReactBack; .\mvnw.cmd test` or `.\mvnw.cmd spring-boot:run`; Java 21 is required.
- Frontend tests use Vitest, jsdom, Testing Library, and `src/setupTests.js` via `vite.config.js`; mirror tests beside components (`*.test.jsx`).
- Backend tests use JUnit 5/Mockito. Controller validation tests use `@WebMvcTest` + `MockMvc` and `@Import(GlobalExceptionHandler.class)`; service tests verify normalization and no repository interaction on domain errors.

## Change cautions
- Do not replace Lombok/JPA entity conventions with hand-written DTO/entity mappings unless a serialization need is demonstrated (especially `Venta` and `Cliente`).
- Updating names, routes, or menu entries also requires coordinated changes across `App.jsx`, `src/data/menu.js`, and views.
- Keep API payloads aligned with `ClienteRequestDTO`/`VentaRequestDTO`; JSON fields use camelCase (for example `primerNombre`, `clienteId`, `productoId`).

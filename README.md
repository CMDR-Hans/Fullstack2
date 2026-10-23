# Sonido Vivo

Tienda de instrumentos y equipos musicales construida con React 19, Vite, React Router y React Bootstrap. La interfaz conserva los estilos propios del proyecto y adapta la navegación, los formularios y las tarjetas a componentes reutilizables y responsivos.

## Requisitos

- Node.js y npm

## Instalación y ejecución

```bash
npm install
npm run dev
```

Comandos disponibles:

| Comando | Uso |
|---|---|
| `npm run dev` | Inicia el servidor local de desarrollo. |
| `npm run build` | Genera la versión de producción en `dist/`. |
| `npm run preview` | Sirve localmente la versión de producción. |
| `npm run lint` | Ejecuta ESLint en el proyecto. |
| `npm test -- --run` | Ejecuta todas las pruebas de Vitest una vez. |

## Funciones principales

- Inicio con categorías, catálogo de productos, contacto y páginas de error 404.
- Navegación cliente con React Router; el header incluye menú adaptable, selector de tema y acceso al carrito.
- Catálogo con detalle de producto en modal y opción para agregar artículos al carrito.
- Carrito con cantidades, eliminación de artículos y cálculo del total. Su contenido se conserva en `localStorage`.
- Temas oscuro, claro y daltónico; la selección se conserva en `localStorage`.
- Formularios de inicio de sesión, registro y contacto con validaciones.
- Panel de administración y acciones de creación, edición y eliminación de productos.
- Productos creados en el panel con marca, categoría, precio e imagen genérica.
- Componentes organizados por Atomic Design: `atoms`, `molecules`, `organisms` y `pages`; la lógica compartida se organiza en `context` y `hooks`.
- React Bootstrap para formularios, navegación, grillas responsivas, tarjetas, botones, alertas, tablas y modales; CSS propio para el estilo visual de la tienda.

## Rutas principales

| Ruta | Contenido |
|---|---|
| `/` | Inicio |
| `/productos` | Catálogo y creación de productos visible para Admin |
| `/login` | Inicio de sesión y registro |
| `/administrador` | Administración y CRUD de productos |
| `/contacto` | Formulario de contacto |
| Cualquier otra ruta | Página 404 |

## Acceso de demostración

- **Administrador:** `admin@admin.cl` / `admin123` — puede probar la creación y administración de productos.
- **Usuario regular:** `usuario@usuario.cl` / `usuario123` — puede iniciar sesión como usuario regular.

Estas credenciales son estáticas y solo sirven para demostración local. La autenticación es exclusivamente de frontend: no usar como mecanismo de seguridad en producción. Las cuentas registradas y los productos del CRUD viven en memoria; se pierden al recargar la página. El carrito y el tema sí se conservan localmente.

## Pruebas

Las pruebas están en los módulos de autenticación, catálogo, formulario de contacto y administración. Usan Vitest con React Testing Library y el patrón Arrange, Act, Assert. Cubren inicio y cierre de sesión, permisos, validaciones de formularios, tarjeta y carrito, creación/edición del producto y un flujo CRUD integrado.

Plan y comprobaciones manuales de diseño adaptable: [plan_de_pruebas.md](./plan_de_pruebas.md).

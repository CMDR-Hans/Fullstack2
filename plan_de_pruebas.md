# Plan de pruebas unitarias — Sonido Vivo

**Herramientas:** Vitest, React Testing Library y jest-dom  
**Ejecución:** `npm test -- --run`  
**Patrón:** cada caso sigue Arrange (preparar/renderizar), Act (interactuar) y Assert (comprobar el resultado).

## Casos automatizados

| ID | Componente | Arrange | Act | Assert |
|---|---|---|---|---|
| PU-001 | `AuthContext` | Renderizar proveedor y consumidor de autenticación. | Iniciar sesión con las credenciales de administrador. | El usuario activo tiene rol `admin` y el resultado es exitoso. |
| PU-002 | `AuthContext` | Renderizar proveedor y consumidor. | Iniciar sesión con las credenciales de usuario regular. | El usuario activo tiene rol `user` y no obtiene rol administrativo. |
| PU-003 | `AuthContext` | Renderizar proveedor y consumidor. | Registrar una cuenta nueva con campos válidos. | Se crea una cuenta con rol `user` y queda autenticada. |
| PU-004 | `AuthContext` | Iniciar sesión con una cuenta de prueba. | Cerrar la sesión. | El usuario activo queda vacío. |
| PU-005 | `AuthContext` | Renderizar proveedor sin sesión. | Enviar una contraseña incorrecta para Admin. | El intento falla y no se inicia sesión. |
| PU-006 | `AuthContext` | Renderizar proveedor sin sesión. | Registrar una cuenta con el correo reservado de Admin. | El registro es rechazado y no se inicia sesión. |
| PU-007 | `TarjetaProducto` | Renderizar la tarjeta con nombre y precio de prueba. | Consultar la tarjeta. | Se presentan el nombre y el precio formateado. |
| PU-008 | `TarjetaProducto` y `CartContext` | Renderizar tarjeta dentro del proveedor del carrito. | Agregar el producto. | El botón confirma la acción y el contador del carrito aumenta a uno. |
| PU-009 | `FormularioContacto` | Renderizar formulario vacío. | Enviar sin completar campos. | Se presentan los errores de nombre, correo y motivo. |
| PU-010 | `FormularioContacto` | Renderizar formulario de contacto. | Completar nombre, correo válido y motivo; enviar. | Se muestra confirmación de envío. |
| PU-011 | `ProductFormAdmin` | Renderizar el formulario vacío. | Ingresar nombre, marca, descripción y precio válidos; guardar. | Se entrega un producto con categoría e imagen genérica al callback. |
| PU-012 | `ProductFormAdmin` | Renderizar con un producto existente. | Consultar el formulario de edición. | El formulario muestra sus valores, incluyendo marca y categoría. |
| PU-013 | `ProductFormAdmin` | Renderizar con un producto existente. | Cambiar el nombre y guardar. | Se preservan el identificador y la imagen existentes al guardar los cambios. |
| PU-014 | `ProductFormAdmin` | Renderizar el formulario de creación. | Intentar guardar sin completar la marca. | No se invoca el callback de guardado. |
| PU-015 | `Administrador` | Renderizar panel con proveedor de autenticación y catálogo vacío. | Como Admin, crear, editar y luego eliminar un producto. | El catálogo refleja cada operación y queda vacío al eliminar el producto. |

## Comprobaciones manuales de responsividad

| ID | Vista / elemento | Acción | Resultado esperado |
|---|---|---|---|
| RM-001 | Header / navegación | Abrir Inicio, Productos y Contacto con ancho móvil. | El menú colapsa, se despliega y permite navegar sin desbordamiento horizontal. |
| RM-002 | Inicio / tarjetas de categorías | Revisar tamaños móvil, tablet y escritorio. | Las tarjetas fluyen a una, dos y tres columnas según el ancho disponible. |
| RM-003 | Catálogo / tarjetas de producto | Revisar tamaños móvil, tablet y escritorio. | Las tarjetas se reorganizan en columnas legibles y los controles permanecen accesibles. |
| RM-004 | Panel Admin / formulario y tabla | Revisar tamaño móvil. | El formulario apila sus campos y la tabla permite desplazamiento horizontal sin romper la página. |
| RM-005 | Carrito | Abrir el carrito en tamaño móvil. | El panel ocupa el ancho disponible y cantidades/acciones siguen siendo accesibles. |
| RM-006 | Contacto | Revisar y enviar el formulario en móvil. | Los campos ocupan el ancho disponible y los errores se leen junto al campo correspondiente. |

## Criterio de aceptación

- Todos los casos automatizados deben pasar con Vitest.
- Los casos manuales deben revisarse en los anchos indicados antes de publicar cambios visuales.
- La creación, edición y eliminación del panel se limita a los productos creados durante la sesión; el catálogo de datos estáticos no se modifica.

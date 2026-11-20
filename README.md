# Sonido Vivo

Aplicación full stack para una tienda de instrumentos y equipos musicales. Incluye un catálogo conectado a una API REST, administración de productos y clientes, carrito de compras y gestión de ventas.

## Tecnologías

### Frontend
- React 19
- Vite
- React Router
- Axios
- Bootstrap 5
- Vitest y Testing Library

### Backend
- Java 21
- Spring Boot
- Spring Data JPA
- MySQL
- Flyway
- Swagger/OpenAPI
- Maven

## Estructura del proyecto

```text
Sonido Vivo/
├── SonidoVivoReactFront/  # Aplicación React
└── SonidoVivoReactBack/   # API REST Spring Boot
```

## Requisitos previos

Instala antes de ejecutar el proyecto:

- Node.js 18 o superior
- Java 21
- Maven, o usa el wrapper incluido
- MySQL
- Git

## Configuración de MySQL

Crea la base de datos antes de iniciar el backend:

```sql
CREATE DATABASE IF NOT EXISTS sonidovivo
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

El backend usa actualmente esta configuración en `SonidoVivoReactBack/src/main/resources/application.properties`:

```properties
server.port=8080
server.servlet.context-path=/api/v1
spring.datasource.url=jdbc:mysql://localhost:3306/sonidovivo
spring.datasource.username=root
spring.datasource.password=
```

Si tu usuario o contraseña de MySQL son diferentes, modifícalos antes de iniciar la aplicación. No publiques contraseñas reales en el repositorio.

Las migraciones de Flyway se ejecutan automáticamente desde:

```text
SonidoVivoReactBack/src/main/resources/db/migration/
```

## Ejecutar el backend

Desde Windows PowerShell:

```powershell
cd SonidoVivoReactBack
.\mvnw.cmd spring-boot:run
```

El backend quedará disponible en:

- API: http://localhost:8080/api/v1
- Swagger: http://localhost:8080/api/v1/swagger-ui.html
- OpenAPI JSON: http://localhost:8080/api/v1/api-docs

### Comandos útiles del backend

Compilar sin ejecutar pruebas:

```powershell
.\mvnw.cmd test -DskipTests
```

Ejecutar todas las pruebas:

```powershell
.\mvnw.cmd test
```

## Ejecutar el frontend

Abre otra terminal desde la raíz del proyecto:

```powershell
cd SonidoVivoReactFront
npm install
npm run dev
```

Abre la aplicación en:

- http://localhost:5173/

### Comandos útiles del frontend

```powershell
npm run build
npm run lint
npm test -- --run
npm run preview
```

## Endpoints principales

Todos los endpoints usan el contexto `/api/v1`.

### Productos

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/productos` | Lista todos los productos |
| GET | `/productos/disponibles` | Lista productos con stock disponible |
| GET | `/productos/{id}` | Obtiene un producto |
| POST | `/productos` | Crea un producto |
| PUT | `/productos/{id}` | Actualiza un producto |
| DELETE | `/productos/{id}` | Elimina un producto |

### Clientes

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/clientes` | Lista todos los clientes |
| GET | `/clientes/{id}` | Obtiene un cliente |
| POST | `/clientes` | Registra un cliente |
| PUT | `/clientes/{id}` | Actualiza un cliente |
| DELETE | `/clientes/{id}` | Elimina un cliente |

### Ventas

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/ventas` | Procesa una venta y descuenta stock |
| GET | `/ventas/{id}` | Obtiene una venta |
| GET | `/ventas/historial/{clienteId}` | Consulta el historial de un cliente |
| DELETE | `/ventas/{id}` | Cancela una venta y restaura el stock |

## Ejemplo de creación de venta

```json
{
  "clienteId": 1,
  "items": [
    {
      "productoId": 1,
      "cantidad": 2
    }
  ]
}
```

## Swagger

Swagger permite explorar y probar los endpoints directamente desde el navegador:

http://localhost:8080/api/v1/swagger-ui.html

Desde Swagger puedes:

1. Seleccionar una sección: Clientes, Productos o Ventas.
2. Abrir el endpoint que quieres probar.
3. Pulsar **Try it out**.
4. Completar el cuerpo o los parámetros.
5. Ejecutar la solicitud y revisar el código HTTP y la respuesta.

## Instalación desde GitHub

```powershell
git clone https://github.com/CMDR-Hans/Fullstack2.git
cd Fullstack2
```

Luego configura MySQL e inicia el backend y el frontend siguiendo los pasos anteriores.

## Recomendaciones

- Ejecuta MySQL antes del backend.
- El frontend espera que el backend esté activo en el puerto `8080`.
- Los productos públicos deben cargar desde `/productos/disponibles` o `/productos`.
- Las migraciones no deben modificarse después de aplicarse en la base de datos; si necesitas cambios, crea una nueva migración con una versión superior.

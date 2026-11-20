# Plan de Pruebas Unitarias

**Nombre del Estudiante:** Victor Andrade
<br />

**Componente / Módulo Principal:** Home, Contacto.
<br />

**Fecha:** 01-01-2027

| ID | Componente<br>*(describe)* | Caso de Prueba<br>*(it / test)* | Preparación<br>*(Arrange: props, mocks)* | Acción<br>*(Act: fireEvent, render)* | Resultado Esperado<br>*(Assert: expect)* | Estado<br>*(Pasa / Falla)* |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **PU-001** | `TarjetaProducto` | Debe cambiar el texto del botón a "Guardado" al hacer clic. | Crear un objeto `productoMock` con nombre "Tableton". | Renderizar el componente y simular `fireEvent.click` en el botón. | El botón debe contener el texto "Guardado". | |
| **PU-002** | `FormularioContacto` | Debe permitir al usuario escribir texto en el campo "Nombre". | Renderizar el componente. | Renderizar `<FormularioContacto/>`.<br>Buscar el input usando su etiqueta (Label) "Nombre:".<br>Simular la escritura usando `fireEvent.change` para ingresar "Pepito". | El valor interno del input (`input.value`) debe ser exactamente "Pepito". | |
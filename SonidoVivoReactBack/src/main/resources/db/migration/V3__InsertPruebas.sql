-- Archivo: V3__InsertPruebas.sql

-- 1. Insertar Clientes (3 registros)
INSERT IGNORE INTO clientes (id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido) VALUES
(1, 'Carlos', 'Alberto', 'Santana', 'Barragán'),
(2, 'Laura', NULL, 'Vargas', 'Méndez'),
(3, 'Diego', 'Andrés', 'Rojas', NULL);

-- 2. Insertar Emails de Clientes (4 registros para probar relación 1 a muchos)
INSERT IGNORE INTO cliente_emails (cliente_id, email) VALUES
(1, 'carlos.santana@ejemplo.com'),
(1, 'csantana.music@ejemplo.com'),
(2, 'laura.vargas@ejemplo.com'),
(3, 'diego.rojas@ejemplo.com');

-- 3. Insertar Teléfonos de Clientes (4 registros)
INSERT IGNORE INTO cliente_telefonos (cliente_id, telefono) VALUES
(1, '+56912345678'),
(2, '+56987654321'),
(2, '+56223456789'),
(3, '+56955554444');

-- 4. Insertar Productos de la tienda musical (5 registros cubriendo todas las categorías)
INSERT IGNORE INTO productos (id, nombre, precio, stock) VALUES
(1, 'Guitarra Eléctrica Fender Stratocaster Player', 850000, 10),
(2, 'Bajo Eléctrico Ibanez SR300E 4 Cuerdas', 420000, 8),
(3, 'Batería Acústica Pearl Export EXX 5 Piezas', 980000, 4),
(4, 'Amplificador Marshall MG30GFX 30W', 260000, 12),
(5, 'Cable Instrumento Ernie Ball 3m + Pack Uñetas', 25000, 50);

-- 5. Insertar Ventas (3 registros con totales calculados según sus detalles)
INSERT IGNORE INTO ventas (id, fecha_venta, total, cliente_id) VALUES
(1, '2026-10-15 14:30:00.000000', 1110000, 1),
(2, '2026-10-16 18:15:20.000000', 470000, 2),
(3, '2026-10-17 11:05:45.000000', 980000, 3);

-- 6. Insertar Detalles de Ventas (5 registros vinculados a las ventas y productos)
INSERT IGNORE INTO detalles_ventas (id, venta_id, producto_id, cantidad, precio_unitario) VALUES
(1, 1, 1, 1, 850000),
(2, 1, 4, 1, 260000),
(3, 2, 2, 1, 420000),
(4, 2, 5, 2, 25000),
(5, 3, 3, 1, 980000);
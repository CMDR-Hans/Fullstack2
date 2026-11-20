ALTER TABLE productos
    ADD COLUMN descripcion VARCHAR(1000) NULL,
    ADD COLUMN imagen VARCHAR(500) NULL;

INSERT INTO productos (nombre, precio, stock, descripcion, imagen)
SELECT 'Fender Stratocaster Player', 780000, 10, 'Cuerpo de aliso, mástil de arce en C y 3 cápsulas Single-Coil Alnico 5.', 'fender'
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Fender Stratocaster Player');

INSERT INTO productos (nombre, precio, stock, descripcion, imagen)
SELECT 'Bajo Ibanez GSR200 4 Cuerdas', 320000, 8, 'Cuerpo de álamo con ecualizador activo Phat II EQ para graves profundos.', 'bajo'
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Bajo Ibanez GSR200 4 Cuerdas');

INSERT INTO productos (nombre, precio, stock, descripcion, imagen)
SELECT 'Batería Yamaha Rydeen 5 Piezas', 650000, 5, 'Vasos de álamo de 6 capas, herrajes dobles reforzados y atril de hi-hat.', 'bateria'
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Batería Yamaha Rydeen 5 Piezas');

INSERT INTO productos (nombre, precio, stock, descripcion, imagen)
SELECT 'Sintetizador Roland XPS-10', 490000, 6, '61 teclas con sensibilidad, sonidos profesionales e interfaz intuitiva.', 'roland'
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Sintetizador Roland XPS-10');

INSERT INTO productos (nombre, precio, stock, descripcion, imagen)
SELECT 'Amplificador Marshall DSL20C', 580000, 7, 'Combo a tubos de 20W con parlante Celestion de 12" y reverb digital.', 'marshall'
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Amplificador Marshall DSL20C');

INSERT INTO productos (nombre, precio, stock, descripcion, imagen)
SELECT 'Micrófono Shure SM58 Vocal', 125000, 15, 'Micrófono dinámico cardioide de estándar profesional para voces en vivo.', 'microfono'
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Micrófono Shure SM58 Vocal');

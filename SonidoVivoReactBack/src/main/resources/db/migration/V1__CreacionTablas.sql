CREATE TABLE clientes (
    id BIGINT NOT NULL AUTO_INCREMENT,
    primer_nombre VARCHAR(100) NOT NULL,
    segundo_nombre VARCHAR(100),
    primer_apellido VARCHAR(100) NOT NULL,
    segundo_apellido VARCHAR(100),
    PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE cliente_emails (
    cliente_id BIGINT NOT NULL,
    email VARCHAR(254) NOT NULL,
    CONSTRAINT uk_cliente_emails_email UNIQUE (email),
    INDEX idx_cliente_emails_cliente_id (cliente_id),
    CONSTRAINT fk_cliente_emails_cliente FOREIGN KEY (cliente_id) REFERENCES clientes (id)
) ENGINE=InnoDB;

CREATE TABLE cliente_telefonos (
    cliente_id BIGINT NOT NULL,
    telefono VARCHAR(16) NOT NULL,
    CONSTRAINT uk_cliente_telefonos_cliente_telefono UNIQUE (cliente_id, telefono),
    INDEX idx_cliente_telefonos_cliente_id (cliente_id),
    CONSTRAINT fk_cliente_telefonos_cliente FOREIGN KEY (cliente_id) REFERENCES clientes (id)
) ENGINE=InnoDB;

CREATE TABLE productos (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(150) NOT NULL,
    precio BIGINT NOT NULL,
    stock INTEGER NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE ventas (
    id BIGINT NOT NULL AUTO_INCREMENT,
    fecha_venta DATETIME(6) NOT NULL,
    total BIGINT NOT NULL,
    cliente_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    INDEX idx_ventas_cliente_id (cliente_id),
    CONSTRAINT fk_ventas_cliente FOREIGN KEY (cliente_id) REFERENCES clientes (id)
) ENGINE=InnoDB;

CREATE TABLE detalles_ventas (
    id BIGINT NOT NULL AUTO_INCREMENT,
    venta_id BIGINT NOT NULL,
    producto_id BIGINT NOT NULL,
    cantidad INTEGER NOT NULL,
    precio_unitario BIGINT NOT NULL,
    PRIMARY KEY (id),
    INDEX idx_detalles_ventas_venta_id (venta_id),
    INDEX idx_detalles_ventas_producto_id (producto_id),
    CONSTRAINT fk_detalles_ventas_venta FOREIGN KEY (venta_id) REFERENCES ventas (id),
    CONSTRAINT fk_detalles_ventas_producto FOREIGN KEY (producto_id) REFERENCES productos (id)
) ENGINE=InnoDB;

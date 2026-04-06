USE productos_db;

CREATE TABLE IF NOT EXISTS productos (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  nombre        VARCHAR(150)   NOT NULL,
  categoria     VARCHAR(100)   NOT NULL,
  marca         VARCHAR(100)   NOT NULL,
  precio        DECIMAL(10,2)  NOT NULL,
  stock         INT            NOT NULL DEFAULT 0,
  imagen        VARCHAR(255),
  descripcion   VARCHAR(500),
  disponibilidad TINYINT(1)    NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS mensajes (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  nombre     VARCHAR(100)  NOT NULL,
  correo     VARCHAR(150)  NOT NULL,
  asunto     VARCHAR(200)  NOT NULL,
  mensaje    TEXT          NOT NULL
);
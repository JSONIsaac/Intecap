-- Nivel Básico

-- 1. Consultas SELECT simples
-- Muestra todos los productos de la tabla productos
SELECT * FROM productos;

-- Muestra el nombre y precio de todos los productos
SELECT nombre, precio FROM productos;

-- 2. Filtrado con WHERE
-- Muestra todos los productos con un precio mayor a 100
SELECT * FROM productos WHERE precio > 100;

-- Encuentra todos los clientes que viven en "Avenida Central"
SELECT * FROM clientes WHERE direccion LIKE '%Avenida Central%';

-- 3. Ordenamiento con ORDER BY
-- Lista todos los productos ordenados por precio de menor a mayor
SELECT * FROM productos ORDER BY precio ASC;

-- 4. Limitación de resultados con LIMIT
-- Muestra los 5 productos más caros
SELECT * FROM productos ORDER BY precio DESC LIMIT 5;

-- 5. Funciones agregadas
-- Calcula el precio promedio de todos los productos
SELECT AVG(precio) AS precio_promedio FROM productos;

-- Encuentra el producto más caro y el más barato
SELECT MAX(precio) AS precio_maximo, MIN(precio) AS precio_minimo FROM productos;

-- Nivel Intermedio

-- 6. JOIN entre tablas
-- Muestra los productos con sus respectivas categorías
SELECT p.producto_id, p.nombre, p.precio, c.nombre AS categoria
FROM productos p
INNER JOIN categorias c ON p.categoria_id = c.categoria_id;

-- Lista los pedidos con la información del cliente que los realizó
SELECT p.pedido_id, p.fecha_pedido, p.estado, p.total,
       c.nombre, c.apellido, c.email
FROM pedidos p
INNER JOIN clientes c ON p.cliente_id = c.cliente_id;

-- 7. GROUP BY y HAVING
-- Agrupa los productos por categoría y cuenta cuántos hay en cada una
SELECT c.nombre AS categoria, COUNT(p.producto_id) AS cantidad_productos
FROM productos p
INNER JOIN categorias c ON p.categoria_id = c.categoria_id
GROUP BY c.nombre;

-- Calcula el total de ventas por cliente y ordena de mayor a menor
SELECT c.nombre, c.apellido, SUM(p.total) AS total_compras
FROM pedidos p
INNER JOIN clientes c ON p.cliente_id = c.cliente_id
GROUP BY c.cliente_id
ORDER BY total_compras DESC;

-- 8. Subconsultas
-- Lista los productos cuyo precio es mayor que el precio promedio
SELECT * FROM productos
WHERE precio > (SELECT AVG(precio) FROM productos);

-- Encuentra los clientes que no han realizado ningún pedido
SELECT * FROM clientes
WHERE cliente_id NOT IN (SELECT DISTINCT cliente_id FROM pedidos);

-- Nivel Avanzado

-- 10. Consultas complejas con múltiples JOIN
-- Muestra un informe detallado de pedidos con cliente, productos y totales
SELECT p.pedido_id, p.fecha_pedido, p.estado,
       c.nombre AS cliente_nombre, c.apellido AS cliente_apellido,
       pr.nombre AS producto_nombre, dp.cantidad, dp.precio_unitario, dp.subtotal
FROM pedidos p
INNER JOIN clientes c ON p.cliente_id = c.cliente_id
INNER JOIN detalles_pedido dp ON p.pedido_id = dp.pedido_id
INNER JOIN productos pr ON dp.producto_id = pr.producto_id
ORDER BY p.pedido_id;

-- 11. Funciones de ventana (Window Functions)
-- Clasifica los productos por precio dentro de cada categoría
SELECT p.nombre, p.precio, c.nombre AS categoria,
       RANK() OVER (PARTITION BY p.categoria_id ORDER BY p.precio DESC) AS ranking
FROM productos p
JOIN categorias c ON p.categoria_id = c.categoria_id;

-- 13. Vistas y manejo de índices
-- Crea una vista que muestre un resumen de ventas por mes
CREATE VIEW resumen_ventas_mensual AS
SELECT 
    YEAR(p.fecha_pedido) AS año,
    MONTH(p.fecha_pedido) AS mes,
    COUNT(p.pedido_id) AS total_pedidos,
    SUM(p.total) AS ingresos_totales,
    AVG(p.total) AS valor_promedio_pedido
FROM pedidos p
GROUP BY YEAR(p.fecha_pedido), MONTH(p.fecha_pedido)
ORDER BY año, mes;

-- Consulta la vista creada
SELECT * FROM resumen_ventas_mensual;

-- Ejemplo de creación de índices para optimizar consultas frecuentes
CREATE INDEX idx_productos_categoria ON productos(categoria_id);
CREATE INDEX idx_pedidos_cliente ON pedidos(cliente_id);
CREATE INDEX idx_pedidos_fecha ON pedidos(fecha_pedido);
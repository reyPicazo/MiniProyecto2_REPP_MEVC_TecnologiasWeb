const {getConnection} = require('../db/db');

const realizarCompra = async (req, res) => {
    try {
        const db = getConnection();
        const carritoAux = req.body.carrito;

        for (const item of carritoAux) {
            const [rows] = await db.query('SELECT stock FROM productos WHERE id = ?', [item.productoid]);

            if (rows.length === 0) {
                return res.status(404).json({ message: `Producto con ID ${item.productoid} no encontrado` });
            }
        }

        for (const item of carritoAux) {
            await db.query('UPDATE productos SET stock = stock - ? WHERE id = ?', [item.cantidad, item.productoid]);
        }

        res.json({ message: 'Compra realizada con exito' });
    } catch (error) {
        res.status(500).json({ message: 'Algo salio mal al realizar la compra' });
    }
};

module.exports = {
    realizarCompra
};
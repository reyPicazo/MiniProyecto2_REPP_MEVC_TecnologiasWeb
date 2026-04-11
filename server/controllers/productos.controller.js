const {getConnection}=require("../db/db");

const getProductos=async(req, res)=>{
    try {
        const db = getConnection();
        const [rows] = await db.query('SELECT * FROM productos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener productos', error });
    }

};

const getById = async (req, res) => {
  try {
    const db = getConnection();
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM productos WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ mensaje: 'Algo salio mal al obtener el producto', error });
  }
};

module.exports={
    getProductos,
    getById
};
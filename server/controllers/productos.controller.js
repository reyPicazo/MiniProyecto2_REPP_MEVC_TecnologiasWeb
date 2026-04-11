const {getConnection}=require("../db/db");

const getProductos=async(req, res)=>{
    try {
        const db = getConnection();
        const [rows] = await db.query('SELECT * FROM productos');
        const productos = rows.map(p => ({
          ...p,
          precio: Number(p.precio),
          disponibilidad: Boolean(p.disponibilidad)
        }));
        res.json(productos);
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
    const producto={
      ...rows[0],
      precio:Number(rows[0].precio),
      disponibilidad:Boolean(rows[0].disponibilidad)
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Algo salio mal al obtener el producto', error });
  }
};

module.exports={
    getProductos,
    getById
};
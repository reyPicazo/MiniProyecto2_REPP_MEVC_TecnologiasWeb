const {getConnection}=require("../db/db");
const {renameImageToProductId}=require("./upload.controller")
const path=require('path');

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

const postProducto=async(req, res)=>{
  
  try{
    const{nombre, categoria, marca, precio, stock, descripcion, disponibilidad} = req.body;
    const imagenFile= req.file;
    if(!nombre || !categoria || !marca || (precio<0) || !stock || !imagenFile || !descripcion || !disponibilidad){
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios y el precio debe ser un número positivo o 0' });
    }

    const disponibilidadBool=disponibilidad==='true' || disponibilidad === 'true' || disponibilidad ==='disponible' ? 1:0;

    const db= await getConnection();
    const result= await db.query(
      'INSERT INTO productos (nombre, categoria, marca, precio, stock, imagen, descripcion, disponibilidad) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre, categoria, marca, precio, stock, imagenFile.filename, descripcion, disponibilidadBool]
    );
    const id=result[0].insertId;
    const newImageName=await renameImageToProductId(imagenFile.filename, id);
    if(newImageName !== imagenFile.filename){
      await db.query(
        'UPDATE productos SET imagen = ? WHERE id = ?', [newImageName, id]
      )
    }

    
    res.status(201).json({  mensaje: "Producto creado exitosamente",id,finalImage:newImageName})
  } catch (error) {
    console.error("Error en postProducto:", error.message);
    res.status(500).json({ mensaje: 'Error al crear producto', error });
  }finally{
    
  }
}

const deleteProducto=async(req, res)=>{
  let conn;
  try{
    conn =await getConnection();
    const {id}=req.params;

    const [product]= await conn.query('SELECT imagen FROM productos WHERE id = ?', [id]);

    if(!product){
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    const result=await conn.query('DELETE FROM productos WHERE id = ?', [id]);
    const filas=result.affectedRows;

    if(filas===0){
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    if(product.imagen){
      const imagenPath=path.join(__dirname, '../assets/img/productos', product.imagen);
      if(FileSystem.existsSync(imagenPath)){
        try{
          FileSystem.unlinkSync(imagenPath);
        }catch(error){
          console.error(`Error al eliminar la imagen: ${product.imagen}`, error.message);
        }
      }
    }

    res.status(200).json({ mensaje: 'Producto eliminado exitosamente' });
  }catch(error){
    console.error(`Error al eliminar el producto: ${id}`, error.message);
    res.status(500).json({ mensaje: 'Error al eliminar producto', error });
  }finally{
    
  }
}

const updateProduct=async(req, res)=>{
  let conn;
  try{
    conn =await getConnection();

    const {id}= req.params;
    const{nombre, categoria, marca, precio, stock, descripcion, disponibilidad} = req.body;
    let imagen = req.file ? req.file.filename : req.body.imagen;
    if(!id||!nombre||!categoria||!marca||(precio<0)||!stock||!descripcion||!disponibilidad){
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios y el precio debe ser un número positivo o 0' });

    }

    const [oldProduct]=await conn.query('SELECT imagen FROM productos WHERE id = ?', [id]);
    if(!oldProduct){
      return res.status(400).json({ mensaje: 'Producto no encontrado' });
    }

    const oldImagen=oldProduct.imagen;
  
    let finalImageName = oldImagen || `${id}.jpg`;
    if (req.file) {
      finalImageName = await renameImageToProductId(req.file.filename, id);
    }

    
    const disponibilidadBool = disponibilidad === 'true' || disponibilidad === true ? 1 : 0;

    const result=await conn.query(
      'UPDATE productos SET nombre = ?, categoria = ?, marca = ?, precio = ?, stock = ?, imagen = ?, descripcion = ?, disponibilidad = ? WHERE id = ?',
      [nombre, categoria, marca, precio, stock, finalImageName, descripcion, disponibilidadBool, id]
    );
    const filas=result.affectedRows;

    if(filas===0){
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    if(oldImagen && oldImagen !== finalImageName){
      const oldpath=path.join(__dirname, '../assets/img/productos', oldImagen);
      if(FileSystem.existsSync(oldpath)){
        try{
          FileSystem.unlinkSync(oldpath);
        }catch(error){
          console.error(`Error al eliminar la imagen: ${oldImagen}`, error.message);
        }
      }
    }
    
    return res.status(200).json({ mensaje: 'Producto actualizado exitosamente' });
  }catch(error){
    console.error("Error en updateProducto:", error.message);
        res.status(500).json({ message: "Ocurrió un error en el servidor. Por favor, intenta más tarde." });
  }finally{
    
  }
}

module.exports={
    getProductos,
    getById,
    postProducto,
    deleteProducto,
    updateProduct
};
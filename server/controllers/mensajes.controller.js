const {getConnection}=require("../db/db");

const postMensajes=async (req, res) => {
    let conn;
    try{
        const{nombre, email, asunto, mensaje}=req.body;
        if(!nombre || !email || !asunto || !mensaje){
            return res.status(400).json({error: "Todos los campos son obligatorios"});
        }
        conn=await getConnection();
        const result=await conn.query(
            'INSERT INTO mensajes(nombre, correo, asunto, mensaje) VALUES (?, ?, ?, ?)',
            [nombre, email, asunto, mensaje]
        );
        const id=result.insertId;
        res.status(201).json({mensaje: 'Mensaje enviado: ', id});
    } catch (error) {
        console.error("Error al enviar el mensaje:", error);
        return res.status(500).json({error: "Error interno del servidor"});
    }finally{
        if(conn){
            conn.release();
        }
    }
}

module.exports={postMensajes};
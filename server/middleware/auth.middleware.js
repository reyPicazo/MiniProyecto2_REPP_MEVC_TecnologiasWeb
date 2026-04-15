const verifyUser = (req, res, next) =>{
    const user = req.headers['x-user'];
    if(!user || user.trim() ==''){
        return res.status(401).json({message: 'Usuario no autorizado'});

    }
    next();
}

const validarMensaje = (req, res, next) => {
  const usuario = req.headers['x-user'];
  
  if (!usuario) {
    return res.status(401).json({ error: 'Debes iniciar sesión para enviar un mensaje' });
  }

  // validar campos
  const { nombre, email, mensaje } = req.body;
  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  next();
};

module.exports={verifyUser, validarMensaje};
const validarCompra = (req, res, next) => {
  const { banco, tarjeta, vencimiento, cvv } = req.body;

  if (!banco || !tarjeta || !vencimiento || !cvv) {
    return res.status(400).json({ error: 'Alguno de los campos se encuentra vacio' });
  }

  if (tarjeta.length !== 16) {
    return res.status(400).json({ error: 'La tarjeta debe tener 16 dígitos' });
  }

  try {
    if(parseInt(tarjeta) < 0) {
        return res.status(400).json({ error: 'La tarjeta no puede ser un número negativo' });
  }
    
  } catch (error) {
    return res.status(400).json({ error: 'La tarjeta debe ser un número válido' });
  }

  
  if (cvv.length !== 3) {
    return res.status(400).json({ error: 'El CVV debe tener 3 dígitos' });
  }

  try {
    if(parseInt(cvv) < 0) {
        return res.status(400).json({ error: 'El CVV no puede ser un número negativo' });
  }
    
  } catch (error) {
    return res.status(400).json({ error: 'El CVV debe ser un número válido' });
  }

  if (vencimiento.length !== 4) {
    return res.status(400).json({ error: 'La fecha de vencimiento debe tener 4 dígitos' });
  }

  try {
    if(parseInt(vencimiento) < 0) {
        return res.status(400).json({ error: 'La fecha de vencimiento no puede ser un número negativo' });
  }
    
  } catch (error) {
    return res.status(400).json({ error: 'La fecha de vencimiento debe ser un número válido' });
  }


  next();
};

module.exports = validarCompra;
const express = require('express');
const router = express.Router();
const validarCompra = require('../middleware/validar-compra.middleware');


router.post('/', validarCompra, (req,res) => {
    res.json({ mensaje: 'La compra se realizo con exito'});
});

module.exports = router;
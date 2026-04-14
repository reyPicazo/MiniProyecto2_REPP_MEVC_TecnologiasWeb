const express = require('express');
const router = express.Router();
const validarCompra = require('../middleware/validar-compra.middleware');
const { realizarCompra } = require('../controllers/compra.controller');


router.post('/', validarCompra, realizarCompra);

module.exports = router;
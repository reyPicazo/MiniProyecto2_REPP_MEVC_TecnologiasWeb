const express = require('express');
const router = express.Router();
const { verifyUser, validarMensaje } = require('../middleware/auth.middleware');
const { postMensajes } = require('../controllers/mensajes.controller');

router.post('/', validarMensaje, postMensajes);

module.exports = router;
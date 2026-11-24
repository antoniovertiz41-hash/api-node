const express = require('express');
const router = express.Router();

const ClientesControlador = require('../controlador/clientesControlador');

router.get('/', ClientesControlador.obtenerClientes);

router.get('/:id', ClientesControlador.obtenerClientePorId);

router.post('/', ClientesControlador.crear);
router.put('/:id', ClientesControlador.actualizar);
router.delete('/:id', ClientesControlador.eliminar);

module.exports = router;
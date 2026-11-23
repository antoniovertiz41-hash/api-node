const express = require('express');
const router = express.Router();

// Los controladores contienen la logica; este modulo solo declara el contrato HTTP.
const ClientesControlador = require('../controlador/clientesControlador');

// GET /api/clientes -> lista todos los clientes.
router.get('/', ClientesControlador.obtenerClientes);

// GET /api/clientes/:id -> obtiene un cliente por identificador.
router.get('/:id', ClientesControlador.obtenerClientePorId);

// POST /api/clientes -> crea; PUT /api/clientes/:id -> actualiza; DELETE /api/clientes/:id -> elimina.
router.post('/', ClientesControlador.crear);
router.put('/:id', ClientesControlador.actualizar);
router.delete('/:id', ClientesControlador.eliminar);

module.exports = router;
const express = require('express');
const clienteRouter = require('./src/rutas/rutas');
const empleadosRouter = require('./src/rutas/empleadosRutas');
const categoriasRouter = require('./src/rutas/categoriasRutas');
const productosRouter = require('./src/rutas/productosRutas');
const pedidosRouter = require('./src/rutas/pedidosRutas');
const detallePedidoRouter = require('./src/rutas/detallePedidoRutas');

const app = express();

app.use(express.json());

app.use('/api/empleados', empleadosRouter);
app.use('/api/clientes', clienteRouter);
app.use('/api/categorias', categoriasRouter);
app.use('/api/productos', productosRouter);
app.use('/api/pedidos', pedidosRouter);
app.use('/api/detalle-pedido', detallePedidoRouter);

module.exports = app;
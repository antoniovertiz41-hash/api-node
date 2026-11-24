const ClientesModelo = require('../modelo/clientesModelo');
const FORMATO_FECHA = /^\d{4}-\d{2}-\d{2}$/;

class ClientesControlador {
    static async obtenerClientes(req, res) {
        try {
            const clientes = await ClientesModelo.obtenerClientes();
            return res.status(200).json({
                exito: true,
                mensaje: 'Clientes obtenidos correctamente',
                datos: clientes
            });
            
        } catch (error) {
            console.error('Error al obtener clientes:', error);
            return res.status(500).json({
                exito: false,
                mensaje: 'Error al obtener los clientes'
            });
        }
    }

    static async obtenerClientePorId(req, res) {
        try {
            const cliente = await ClientesModelo.obtenerClientePorId(req.params.id);
            if (!cliente) {
                return res.status(404).json({
                    exito: false,
                    mensaje: 'Cliente no encontrado'
                });
            }
            return res.status(200).json({
                exito: true,
                mensaje: 'Cliente obtenido correctamente',
                datos: cliente
            });
        } catch (error) {
            console.error('Error al obtener cliente:', error);
            return res.status(500).json({
                exito: false,
                mensaje: 'Error al obtener el cliente'
            });
        }
    }

    static async crear(req, res) {
        const { nombre, ciudad, fecha_registro } = req.body || {};
        if (typeof nombre !== 'string' || !nombre.trim() ||
            typeof ciudad !== 'string' || !ciudad.trim()) {
            return res.status(400).json({
                exito: false,
                mensaje: 'Nombre y ciudad son obligatorios y deben ser texto'
            });
        }

        if (fecha_registro !== undefined &&
            (typeof fecha_registro !== 'string' || !FORMATO_FECHA.test(fecha_registro))) {
            return res.status(400).json({
                exito: false,
                mensaje: 'La fecha_registro debe tener el formato YYYY-MM-DD'
            });
        }

        try {
            const nuevoCliente = await ClientesModelo.crear({
                nombre: nombre.trim(),
                ciudad: ciudad.trim(),
                fecha_registro: typeof fecha_registro === 'string' && fecha_registro.trim()
                    ? fecha_registro.trim()
                    : undefined
            });

            return res.status(201).json({
                exito: true,
                mensaje: 'Cliente creado correctamente',
                datos: nuevoCliente
            });
        } catch (error) {
            console.error('Error al crear cliente:', error);
            return res.status(500).json({
                exito: false,
                mensaje: 'Error al crear el cliente'
            });
        }
    }

    static async actualizar(req, res) {
        const datos = req.body || {};
        const datosLimpios = {};

        if (typeof datos.nombre === 'string' && datos.nombre.trim()) {
            datosLimpios.nombre = datos.nombre.trim();
        }
        if (typeof datos.ciudad === 'string' && datos.ciudad.trim()) {
            datosLimpios.ciudad = datos.ciudad.trim();
        }
        if (datos.fecha_registro !== undefined) {
            if (typeof datos.fecha_registro !== 'string' || !FORMATO_FECHA.test(datos.fecha_registro)) {
                return res.status(400).json({
                    exito: false,
                    mensaje: 'La fecha_registro debe tener el formato YYYY-MM-DD'
                });
            }
            datosLimpios.fecha_registro = datos.fecha_registro;
        }

        try {
            const clienteActualizado = await ClientesModelo.actualizar(req.params.id, datosLimpios);
            if (!clienteActualizado) {
                return res.status(404).json({
                    exito: false,
                    mensaje: 'Cliente no encontrado'
                });
            }

            return res.status(200).json({
                exito: true,
                mensaje: 'Cliente actualizado correctamente',
                datos: clienteActualizado
            });
        } catch (error) {
            console.error('Error al actualizar cliente:', error);
            return res.status(500).json({
                exito: false,
                mensaje: 'Error al actualizar el cliente'
            });
        }
    }

    static async eliminar(req, res) {
        try {
            const eliminado = await ClientesModelo.eliminar(req.params.id);

            if (!eliminado) {
                return res.status(404).json({
                    exito: false,
                    mensaje: 'Cliente no encontrado'
                });
            }

            return res.status(200).json({
                exito: true,
                mensaje: 'Cliente eliminado correctamente'
            });
        } catch (error) {
            if (error.code === 'ER_ROW_IS_REFERENCED_2') {
                return res.status(409).json({
                    exito: false,
                    mensaje: 'No se puede eliminar el registro porque tiene pedidos asociados'
                });
            }
            console.error('Error al eliminar cliente:', error);
            return res.status(500).json({
                exito: false,
                mensaje: 'Error al eliminar el cliente'
            });
        }
    }
}

module.exports = ClientesControlador;

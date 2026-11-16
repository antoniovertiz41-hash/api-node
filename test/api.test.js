const test = require('node:test');
const assert = require('node:assert/strict');
const UsuarioControlador = require('../src/controlador/usuarioControlador');
const EmpleadosControlador = require('../src/controlador/empleadosControlador');

function response() {
    return {
        statusCode: undefined,
        body: undefined,
        status(code) {
            this.statusCode = code;
            return this;
        },
        json(body) {
            this.body = body;
            return this;
        }
    };
}

test('POST /api creates a user with nombre and email', () => {
    const res = response();
    UsuarioControlador.crear({ body: { nombre: 'Ana', email: 'ana@example.com' } }, res);

    assert.equal(res.statusCode, 201);
    assert.equal(res.body.usuario.nombre, 'Ana');
    assert.equal(res.body.usuario.email, 'ana@example.com');
});

test('PUT /api/:id updates the same email field used by POST', () => {
    const res = response();
    UsuarioControlador.actualizar({
        params: { id: '1' },
        body: { email: 'actualizado@example.com' }
    }, res);

    assert.equal(res.statusCode, 200);
    assert.equal(res.body.datos.email, 'actualizado@example.com');
});

test('POST /api rejects a missing email and an absent body', () => {
    const missingEmail = response();
    UsuarioControlador.crear({ body: { nombre: 'Ana' } }, missingEmail);
    assert.equal(missingEmail.statusCode, 400);

    const absentBody = response();
    UsuarioControlador.crear({}, absentBody);
    assert.equal(absentBody.statusCode, 400);
});

test('POST /api/empleados rejects fields before database access', async () => {
    const res = response();
    await EmpleadosControlador.crearEmpleado({ body: { nombre: 'Ana' } }, res);
    assert.equal(res.statusCode, 400);
});

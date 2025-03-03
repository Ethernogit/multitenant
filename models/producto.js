const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    atributos: {
        color: String
    }
});

const modelos = {};

function getProductoModel(db) {
    const tenantID = db.name; // Asegúrate de que `db` tiene `name` o usa el identificador correcto
    if (!modelos[tenantID]) {
        modelos[tenantID] = db.model('Producto', productoSchema);
    }
    return modelos[tenantID];
}

module.exports = getProductoModel;
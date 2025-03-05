'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CampoSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Nombre del campo (ej. "nombre", "precio")
    type: { type: String, required: true, enum: ["string", "number", "boolean", "date", "text", "ObjectId"] }, // Tipo de dato
    requerido: { type: Boolean, default: false }, // Si el campo es obligatorio
    opciones: [{ type: String }]
});

const ConfigSchema = new Schema({
    formulario: { type: String, required: true, unique: true }, // Nombre del formulario (ej. "productos", "ventas")
    campos: [CampoSchema], // Lista de campos
    created_at: { type: Date, default: Date.now } // Fecha de creación
});

module.exports = (connection) => connection.model('formularios', ConfigSchema);
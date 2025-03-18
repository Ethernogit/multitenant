'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Definir el esquema de Categoria
const categoriaSchema = new Schema({
  nombre: { type: String, required: true },
});

// Definir el esquema de Subcategoria
const subcategoriaSchema = new Schema({
  nombre: { type: String, required: true },
  categoria: { type: Schema.Types.ObjectId, ref: 'Categorias', required: true }
});

// Crear los modelos
// const Categoria = mongoose.model('Categoria', categoriaSchema);
module.exports = (connection) => {
  const Categoria = connection.model('Categorias', categoriaSchema);
  const Subcategoria = connection.model('Subcategorias', subcategoriaSchema);
  return { Categoria, Subcategoria };
};// const Subcategoria = mongoose.model('Subcategoria', subcategoriaSchema);

// Exportar los modelos
// module.exports = { Categoria, Subcategoria };

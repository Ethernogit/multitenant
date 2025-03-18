
const crearCategoria = async (req, res) => {
    try {
        const { nombre } = req.body;

        const { Categoria } = require('../../models/categorias')(req.dbConnection);

        const nuevaCategoria = new Categoria({ nombre });

        await nuevaCategoria.save();

        res.status(201).json(nuevaCategoria);
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar la categoría' });
    }
};
const obtenerCategorias = async (req, res) => {
    try {
        const { Categoria } = require('../../models/categorias')(req.dbConnection);

        const categorias = await Categoria.find();

        res.json(categorias);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las categorías' });
    }
}
const eliminarCategoria = async (req, res) => {
    try {
        const idcategoria = req.params.idcategoria;

        const { Categoria } = require('../../models/categorias')(req.dbConnection);
        const { Subcategoria } = require('../../models/categorias')(req.dbConnection);
        await Categoria.findByIdAndDelete(idcategoria);
        await Subcategoria.deleteMany({ categoria: idcategoria });
        res.json({ message: 'Categoría eliminada' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar la categoría' });
    }
}





const crearSubcategoria = async (req, res) => {
    try {
        const { nombre, categoriaId } = req.body;

        const { Subcategoria } = require('../../models/categorias')(req.dbConnection);

        const nuevaSubcategoria = new Subcategoria({
            nombre,
            categoria: categoriaId
        });
        console.log(nuevaSubcategoria);
        await nuevaSubcategoria.save();

        res.status(201).json(nuevaSubcategoria);
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar la subcategoría' });
    }
};
const obtenerSubcategorias = async (req, res) => {
    try {
        const idcategoria = req.params.idcategoria;

        const { Subcategoria } = require('../../models/categorias')(req.dbConnection);

        const subcategorias = await Subcategoria.find({ categoria: idcategoria });

        res.json(subcategorias);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las categorías' });
    }
}
const eliminarSubcategoria = async (req, res) => {
    try {
        const idsubcategoria = req.params.idsubcategoria;

        const { Subcategoria } = require('../../models/categorias')(req.dbConnection);

        await Subcategoria.findByIdAndDelete(idsubcategoria);

        res.json({ message: 'Subcategoría eliminada' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar la subcategoría' });
    }
}
module.exports = {
    crearCategoria,
    obtenerCategorias,
    eliminarCategoria,
    crearSubcategoria,
    obtenerSubcategorias,
    eliminarSubcategoria
};
const getProductoModel = require("../../models/producto");

const crearProducto = async (req, res) => {
    try {
        const Producto = getProductoModel(req.db);
        const nuevoProducto = await Producto.create(req.body);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ error: "Error al crear producto" });
    }
};

const obtenerProductos = async (req, res) => {
    try {
        const Producto = getProductoModel(req.db);
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
};

module.exports = {
    crearProducto,
    obtenerProductos
};
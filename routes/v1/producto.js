const express = require("express");
const { crearProducto, obtenerProductos } = require("../../controllers/v1/productosController");

const router = express.Router();

router.post("/", crearProducto);
router.get("/", obtenerProductos);

module.exports = router;
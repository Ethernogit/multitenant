const express = require("express");
const usuarioController = require("../../controllers/v1/usuariosController");

const router = express.Router();

router.post("/", usuarioController.crearUsuario);
router.get("/", usuarioController.obtenerUsuarios);

module.exports = router;
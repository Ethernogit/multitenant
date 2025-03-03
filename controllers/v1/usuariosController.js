const bcrypt = require('bcrypt');
const Users = require('../../models/usuario');

const crearUsuario = async (req, res) => {
    console.log('Entrando al controlador crearUsuario');

    try {
        console.log('Creando usuario...');
        const { name, email, password } = req.body;

       

      
        // const usuarioExistente = await Users.findOne({ email });
        // if (usuarioExistente) {
        //     return res.status(400).json({ error: 'El usuario ya existe' });
        // }

        // Hash de la contraseña antes de guardar
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear nuevo usuario
        const nuevoUsuario = new Users({ name, email, password: hashedPassword });
        console.log('Nuevo usuario a guardar:', nuevoUsuario);

        await nuevoUsuario.save();

        
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
};


const obtenerUsuarios = async (req, res) => {
    try {
        const Usuario = require('../../models/usuario')(req.db);
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

module.exports = {
    crearUsuario,
    obtenerUsuarios
};
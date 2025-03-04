const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("login");

        const tenantId = req.header('x-tenant-id');
        if (!tenantId) {
            return res.status(400).json({ error: 'Falta el ID del tenant' });
        }
        const Users = require('../../models/usuario')(req.dbConnection);

        // Buscar el usuario por email
        const usuario = await Users.findOne({ email });
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        // Comparar la contraseña
        const esValida = await bcrypt.compare(password, usuario.password);
        if (!esValida) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }


        // Generar un token JWT
        const token = jwt.sign(
            {
                id: usuario._id,
                email: usuario.email,
                tenantId: tenantId
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

module.exports = {
    login
};
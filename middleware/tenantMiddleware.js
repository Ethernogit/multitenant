const mongoose = require('mongoose');

const connections = {};

const tenantMiddleware = async (req, res, next) => {
    const tenantId = req.header('x-tenant-id');
    if (!tenantId) {
        return res.status(400).json({ error: 'Falta el ID del tenant' });
    }
    console.log(`Middleware tenant: ${tenantId}`);
    if (!connections[tenantId]) {
        try {
            const dbURI = `mongodb://localhost:27017/${tenantId}`;
            const connection = await mongoose.createConnection(dbURI);
            connections[tenantId] = connection;
            console.log(`Conectado a la base de datos del tenant: ${tenantId}`);
        } catch (error) {
            console.error(`Error al conectar a la base de datos del tenant: ${tenantId}`, error);
            return res.status(500).json({ error: 'Error al conectar a la base de datos' });
        }
    }

    req.dbConnection = connections[tenantId];
    next();
};

module.exports = tenantMiddleware;
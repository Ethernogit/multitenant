const mongoose = require('mongoose');

const connections = {};

const tenantMiddleware = async (req, res, next) => {
    const tenantId = req.header('x-tenant-id');
    if (!tenantId) {
        return res.status(400).json({ error: 'Falta el ID del tenant' });
    }
    if (!connections[tenantId]) {
        try {
            const dbURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${tenantId}`;
            const connection = await mongoose.createConnection(dbURI);
            connections[tenantId] = connection;
        } catch (error) {
            return res.status(500).json({ error: 'Error al conectar a la base de datos' });
        }
    }
    req.dbConnection = connections[tenantId];
    next();
};

module.exports = tenantMiddleware;
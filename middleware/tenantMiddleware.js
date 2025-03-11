const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const connections = {};

const tenantMiddleware = async (req, res, next) => {
    let tenantId = req.header('x-tenant-id');
    if (!tenantId) {
        const { email } = req.body;
        if (email) {
            tenantId = email.split('@')[1].split('.')[0];
        } else {
            const token = req.header('Authorization')?.replace('Bearer ', '');
            if (token) {
                try {
                    const decoded = jwt.verify(token, process.env.JWT_SECRET);
                    tenantId = decoded.tenantId;
                } catch (error) {
                    return res.status(401).json({ error: 'Token inválido' });
                }
            }
        }
    }
    if (!tenantId) {
        return res.status(400).json({ error: 'Falta el ID del tenant' });
    }

    if (!connections[tenantId]) {
        try {
            const dbURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${tenantId}`;
            const connection = await mongoose.createConnection(dbURI, {
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000
            });
            connections[tenantId] = connection;
            console.log(`Conectado a la base de datos del tenant: ${tenantId}`);
        } catch (error) {
            console.error(`Error al conectar a la base de datos del tenant: ${tenantId}`, error);
            return res.status(500).json({ error: 'Error al conectar a la base de datos' });
        }
    }

    req.dbConnection = connections[tenantId];
    req.tenantId = tenantId;
    next();
};

module.exports = tenantMiddleware;
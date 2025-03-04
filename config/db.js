const mongoose = require("mongoose");

const connections = {
    "bether_gold": {
        dbURI: "mongodb://localhost:27017/bether_gold",
        connection: null
    },
    "tallerchris": {
        dbURI: "mongodb://localhost:27017/tallerchris",
        connection: null
    }
};

const connectToDatabase = async (tenantId) => {
    if (connections[tenantId]) {
        console.log(`🔄 Reutilizando conexión a ${tenantId}`);
        return connections[tenantId].connection; // Reutiliza la conexión
    }

    const dbURI = `mongodb+srv://joseftsmrtz:xGju2deDpsoNDEh1@bethergold.fen9s.mongodb.net/${tenantId}`;
    console.log(`🔗 Creando nueva conexión a ${tenantId}`);

    const connection = await mongoose.connect(dbURI);
    console.log(`🔗 Conexión a ${connection} creada`);

    // Guardamos la conexión en el objeto
    connections[tenantId] = { dbURI, connection };
    console.log("📌 Estado actual de conexiones:", Object.keys(connections));

    return connection;
};

module.exports = connectToDatabase;

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const v1Routes = require('./routes/v1');
const tenantMiddleware = require('./middleware/tenantMiddleware');

const app = express();
app.use(bodyParser.json());

const connections = {};

// Middleware para manejar el tenant
app.use(tenantMiddleware);


app.use('/v1', v1Routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
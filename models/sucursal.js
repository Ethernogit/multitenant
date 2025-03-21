'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SucursalSchema = Schema({
    name: {type: String,required: true},
    status: {type: Boolean,default: true},
    address: {type: String},
    phone: {type: String},
});

module.exports = (connection) => connection.model('Sucursales', SucursalSchema);
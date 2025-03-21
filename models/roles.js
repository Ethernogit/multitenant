'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoleSchema = Schema({
	name: { type : String, required : true},
	slug: { type : String, unique : true, required : true},
	permissions: [{ type: Schema.ObjectId, ref: 'Permission' }]
});
module.exports = (connection) => connection.model('Roles', RoleSchema);

// module.exports = mongoose.model('UserRole',UserRoleSchema);
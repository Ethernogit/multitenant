'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PermissionSchema = Schema({
	name: { type : String, required : true},
	slug: { type : String, unique : true, required : true}
});
module.exports = (connection) => connection.model('Permission', PermissionSchema);
// module.exports = mongoose.model('UserPermission',UserPermissionSchema);
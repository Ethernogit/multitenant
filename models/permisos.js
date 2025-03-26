'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PermissionSchema = Schema({
	name: { type: String, required: true },
	slug: { type: String, required: true },
	description: { type: String, required: true },
	group: { type: String, required: true },
	order: { type: Number, default: 0 },
	isActive: { type: Boolean, default: true }
});

// Definimos los índices una sola vez
PermissionSchema.index({ slug: 1 }, { unique: true });
PermissionSchema.index({ group: 1, order: 1 });

module.exports = (connection) => connection.model('Permission', PermissionSchema);
// module.exports = mongoose.model('UserPermission',UserPermissionSchema);
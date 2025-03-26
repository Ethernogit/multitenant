const mongoose = require('mongoose');

const defaultPermissions = [
    // Gestión de Usuarios
    {
        name: 'Crear Usuarios',
        slug: 'user_create',
        description: 'Permite crear nuevos usuarios en el sistema',
        group: 'user',
        order: 1
    },
    {
        name: 'Ver Usuarios',
        slug: 'user_read',
        description: 'Permite ver la lista de usuarios',
        group: 'user',
        order: 2
    },
    {
        name: 'Editar Usuarios',
        slug: 'user_update',
        description: 'Permite modificar usuarios existentes',
        group: 'user',
        order: 3
    },
    {
        name: 'Eliminar Usuarios',
        slug: 'user_delete',
        description: 'Permite eliminar usuarios del sistema',
        group: 'user',
        order: 4
    },

    // Gestión de Roles
    {
        name: 'Crear Roles',
        slug: 'role_create',
        description: 'Permite crear nuevos roles en el sistema',
        group: 'role',
        order: 1
    },
    {
        name: 'Ver Roles',
        slug: 'role_read',
        description: 'Permite ver la lista de roles',
        group: 'role',
        order: 2
    },
    {
        name: 'Editar Roles',
        slug: 'role_update',
        description: 'Permite modificar roles existentes',
        group: 'role',
        order: 3
    },
    {
        name: 'Eliminar Roles',
        slug: 'role_delete',
        description: 'Permite eliminar roles del sistema',
        group: 'role',
        order: 4
    },

    // Gestión de Catálogos
    {
        name: 'Crear Catálogos',
        slug: 'catalog_create',
        description: 'Permite crear nuevos catálogos',
        group: 'catalog',
        order: 1
    },
    {
        name: 'Ver Catálogos',
        slug: 'catalog_read',
        description: 'Permite ver la lista de catálogos',
        group: 'catalog',
        order: 2
    },
    {
        name: 'Editar Catálogos',
        slug: 'catalog_update',
        description: 'Permite modificar catálogos existentes',
        group: 'catalog',
        order: 3
    },
    {
        name: 'Eliminar Catálogos',
        slug: 'catalog_delete',
        description: 'Permite eliminar catálogos',
        group: 'catalog',
        order: 4
    },

    // Reportes
    {
        name: 'Ver Reportes',
        slug: 'report_view',
        description: 'Permite ver reportes del sistema',
        group: 'report',
        order: 1
    },
    {
        name: 'Exportar Reportes',
        slug: 'report_export',
        description: 'Permite exportar reportes a diferentes formatos',
        group: 'report',
        order: 2
    },
    {
        name: 'Crear Reportes',
        slug: 'report_create',
        description: 'Permite crear nuevos reportes personalizados',
        group: 'report',
        order: 3
    }
];

async function initializePermissions() {
    try {
        // Conectar a la base de datos
        await mongoose.connect('mongodb://localhost:27017/multitenant', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Conectado a la base de datos');

        // Obtener el modelo de Permission usando la conexión
        const Permission = require('../models/permisos')(mongoose.connection);

        // Eliminar permisos existentes
        await Permission.deleteMany({});
        console.log('Permisos existentes eliminados');

        // Insertar nuevos permisos
        const result = await Permission.insertMany(defaultPermissions);
        console.log(`${result.length} permisos insertados exitosamente`);

        // Cerrar conexión
        await mongoose.connection.close();
        console.log('Conexión cerrada');

    } catch (error) {
        console.error('Error al inicializar permisos:', error);
    }
}

initializePermissions(); 
'use strict'

const getPermisos = async (req, res) => {
    try {
        const Permission = require('../../models/permisos')(req.dbConnection);
        console.log("controller permisos");
        
        const permisos = await Permission.find({ isActive: true })
            .sort({ group: 1, order: 1 });
        res.json(permisos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPermisosByGroup = async (req, res) => {
    try {
        const { group } = req.params;
        const Permission = require('../../models/permisos')(req.dbConnection);
        const permisos = await Permission.find({ 
            group: group,
            isActive: true 
        }).sort({ order: 1 });
        res.json(permisos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPermiso = async (req, res) => {
    try {
        console.log("controller permisos");

        const Permission = require('../../models/permisos')(req.dbConnection);

        const permiso = new Permission(req.body);
        console.log("controller permisos");

        const newPermiso = await permiso.save();
        res.status(201).json(newPermiso);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updatePermiso = async (req, res) => {
    try {
        const { id } = req.params;
        const Permission = require('../../models/permisos')(req.connection);
        const permiso = await Permission.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        if (!permiso) {
            return res.status(404).json({ message: 'Permiso no encontrado' });
        }
        res.json(permiso);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deletePermiso = async (req, res) => {
    try {
        const { id } = req.params;
        const Permission = require('../../models/permisos')(req.connection);
        const permiso = await Permission.findByIdAndDelete(id);
        if (!permiso) {
            return res.status(404).json({ message: 'Permiso no encontrado' });
        }
        res.json({ message: 'Permiso eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getPermisos,
    getPermisosByGroup,
    createPermiso,
    updatePermiso,
    deletePermiso
}; 
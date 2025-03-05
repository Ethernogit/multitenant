
const crearFormulario = async (req, res) => {
    try {
        const { formulario, campos } = req.body;
        console.log("formulario", formulario);

        const configurations = require('../../models/formulariosEmpresa')(req.dbConnection);

        const nuevaConfig = new configurations({ formulario, campos });

        await nuevaConfig.save();

        res.status(201).json(nuevaConfig);
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar la configuración' });
    }
};
const obtenerFormulario = async (req, res) => {
    try {
        const { formulario } = req.params;
        const configurations = require('../../models/formulariosEmpresa')(req.dbConnection);

        const config = await configurations.findOne({ formulario });

        if (!config) {
            return res.status(404).json({ error: 'Configuración no encontrada' });
        }

        res.json(config);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la configuración' });
    }
};
const actualizarFormulario = async (req, res) => {
    try {
        const { formulario } = req.params;
        const { campos } = req.body;

        const configActualizada = await Configuracion.findOneAndUpdate(
            { formulario },
            { campos },
            { new: true }
        );

        if (!configActualizada) {
            return res.status(404).json({ error: 'Configuración no encontrada' });
        }

        res.json(configActualizada);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la configuración' });
    }
};
const eliminarFormulario = async (req, res) => {
    try {
        const { formulario } = req.params;

        const resultado = await Configuracion.findOneAndDelete({ formulario });

        if (!resultado) {
            return res.status(404).json({ error: 'Configuración no encontrada' });
        }

        res.json({ message: 'Configuración eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la configuración' });
    }
};
module.exports = {
    crearFormulario,
    obtenerFormulario,
    actualizarFormulario,
    eliminarFormulario
};
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

exports.crearProyecto = async ( req, res ) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if ( !errores.isEmpty() ) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {

        //Crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);

        //Guardar el creador del proyecto via jwt
        proyecto.creador = req.usuario.id

        //Guardar proyecto
        proyecto.save();
        res.json(proyecto);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error'});
    }
}

//Obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async ( req, res ) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if ( !errores.isEmpty() ) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        
        const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({ creado: -1 }); // Consulta en la BD todos los proyectos con el ID del usuario, el sort es para ordenar los valores 
        res.json(proyectos);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error'})
    }

}

//Actualizar un proyecto
exports.actualizarProyectos = async ( req, res ) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if ( !errores.isEmpty() ) {
        return res.status(400).json({ errores: errores.array() });
    }

    //Extraer la información del proyecto
    const { nombre } = req.body;
    const nuevoProyecto = {};

    if (nombre) {
        nuevoProyecto.nombre = nombre
    }

    try {

        //Revisar el ID
        let proyecto = await Proyecto.findById(req.params.id);//req.params.id nos permite saber que id es el que viene en el request, esta linea busca en la BD un registro con ese ID
        //Si el proyecto existe
        if (!proyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }
        //Verificar el creador del proyecto
        if (proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }
        //Actualizar                                   //Busca por eñ ID      Datos a actualizar     Autorizar
        proyecto = await Proyecto.findByIdAndUpdate({ _id: req.params.id }, {$set: nuevoProyecto}, { new: true });
        
        res.json({ proyecto });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'Error en el servidor'});
    }

}
//Eliminar un proyecto
exports.eliminarProyectos = async ( req, res ) => {


    try {
        //Revisar el ID
        let proyecto = await Proyecto.findById(req.params.id);//req.params.id nos permite saber que id es el que viene en el request, esta linea busca en la BD un registro con ese ID
        //Si el proyecto existe
        if (!proyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }
        //Verificar el creador del proyecto
        if (proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }     
        
        //Eliminar el proyecto
        await Proyecto.findOneAndDelete({ _id: req.params.id });
        res.json({ msg: 'Proyecto Eliminado' });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'Error en el servidor'});
    }
}
const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const { check } = require('express-validator');

//Importamos el middleware
const auth = require('../middleware/auth');


// api/proyectos

//Crear Proyecto
router.post('/',
    auth, //Solo agregandolo de esta forma se pasa al middleware y verifica todo lo que hay ahí
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
);

//Obtener Proyecto
router.get('/',
    auth, //Solo agregandolo de esta forma se pasa al middleware y verifica todo lo que hay ahí
    proyectoController.obtenerProyectos
);

//Actualizar proyecto
router.put('/:id',
    auth, //Solo agregandolo de esta forma se pasa al middleware y verifica todo lo que hay ahí
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyectos
);

//Eliminar proyecto
router.delete('/:id',
    auth, //Solo agregandolo de esta forma se pasa al middleware y verifica todo lo que hay ahí
    proyectoController.eliminarProyectos
);

module.exports = router;


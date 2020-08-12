const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const { check } = require('express-validator');

//Importamos el middleware
const auth = require('../middleware/auth');

//Ruta api/tareas

//Crear Tarea
router.post('/', 
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
);

//Obtener las tareas por proyecto
router.get('/',
    auth,
    tareaController.obtenerTareas
);

//Actualizar tarea
router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty()
    ],
    tareaController.actualizarTarea
);

//Eliminar Tarea
router.delete('/:id',
    auth,
    tareaController.eliminarTarea
);

module.exports = router;
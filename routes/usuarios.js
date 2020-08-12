//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');//Permite agregar validaciones a los campos requeridos, se instala con npm i express-validator

//Crear un usuario
// api/usuarios
router.post('/', 

    //Validaciones
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agregar un email válido').isEmail(),
        check('password', 'La contraseña debe ser minimo de 6 caracteres ').isLength({ min: 6}),
    ],

    usuarioController.crearUsuario
);

module.exports = router;
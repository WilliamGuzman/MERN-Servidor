//Rutas para autenticar usuario
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');//Permite agregar validaciones a los campos requeridos, se instala con npm i express-validator

//Importamos el controller
const authController = require('../controllers/authController');

//Importamos el middleware
const auth = require('../middleware/auth');

//Iniciar sesion
// api/auth
router.post('/', 
    authController.autenticarUsuario

);
//Obtiene el usuario autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado
);

module.exports = router;
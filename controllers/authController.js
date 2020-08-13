const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');//Se instala con el comando npm i bcryptjs
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');//Se instala con el comando npm i jsonwebtoken

exports.autenticarUsuario = async ( req, res ) => {
    
    //Revisar si hay errores
    const errores = validationResult(req);
    if ( !errores.isEmpty() ) {
        return res.status(400).json({ errores: errores.array() });
    }

    //Extraer el email y password
    const { email , password } = req.body;

    try {
        
        //Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ msg: 'El usuario no existe'});
        }

        //Revisar el password
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if (!passCorrecto) {
            return res.status(400).json({ msg: 'El password es incorrecto' });
        }

        //Si todo esta correcto Crear el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        //Firmar el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 //1 hora
        }, (error, token) => {
            if (error) throw error;

            //Mensaje de confirmación
            res.json({ token });
        });

    } catch (error) {
        console.log(error);
    }
}

//Obtiene que usuario esta autenticado
exports.usuarioAutenticado = async ( req, res ) => {
    try {
        
        const usuario = await Usuario.findById(req.usuario.id).select('-password');//El select es para quitar los campos que queramos
        res.json({ usuario });
    } catch (error) {
        //console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
}
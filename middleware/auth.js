const jwt = require('jsonwebtoken');

module.exports = function( req, res, next) {
    //Leer el token del header
    const token = req.header('x-auth-token'); //En cada request se tiene que enviar

    //Revisar si no hay token
    if (!token) {
        return res.status(401).json({ msg: 'No hay token, permiso no válido' })
    }

    //Validar el token
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario; //Se añade el id del usuario al request
        next();//Se va al siguiente middleware si este existe
    } catch (error) {
        res.status(401).json({smg: 'Token no válido'});
    }
}
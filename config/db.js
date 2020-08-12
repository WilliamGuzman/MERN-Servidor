const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });//Nos permite leer las variables de entorno de un archivo, en este caso variables.env

const conectarDB = async () => {

    try {
        
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }); //Lee el valor de la variable con la cadena de conexion que se encuentra en el archivo variables.env
        console.log('DB Conectada');
    } catch (error) {
        console.log(error);
        process.exit(1); //Detener la APP
    }

}

module.exports = conectarDB;
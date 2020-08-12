const mongoose = require('mongoose');

//Aca se agregaran los campos que contendra cada modelo de la base de datos
const UsuariosSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
    registro:{
        type: Date,
        default: Date.now()
    }
    
});

module.exports = mongoose.model('Usuario', UsuariosSchema);//Exportamos todos el modelo
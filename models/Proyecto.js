const mongoose = require('mongoose');

const proyectoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId, //Llave foranea
        ref: 'Usuario' //Referencia al ID del modelo a relacionar
    },
    creado: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Proyecto', proyectoSchema);
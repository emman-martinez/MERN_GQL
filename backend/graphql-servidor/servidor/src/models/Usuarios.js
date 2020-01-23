/* Mongo Schema: Usuarios */
import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const usuariosSchema = new Schema({
    usuario: String,
    nombre: String,
    password: String,
    rol: String
}, {
    timestamps: true // Fecha de creación y actualización
});

// Hashear los passwords antes de guardarlos en la base de datos
usuariosSchema.pre('save', function(next) { // Ejecutar código antes de que se guarde en la base
    // Si el password no esta modificado ejecutar la siguiente función
    if (!this.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);

            this.password = hash;
            next();
        })
    })
});

module.exports = model('Usuarios', usuariosSchema);
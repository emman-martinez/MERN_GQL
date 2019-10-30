/* Mongo Schema: Clientes */
import { Schema, model } from 'mongoose';

const clientesSchema = new Schema({
    nombre: String,
    apellido: String,
    empresa: String,
    emails: Array,
    edad: Number,
    tipo: String,
    pedidos: Array
}, {
    timestamps: true // Fecha de creación y actualización
});

module.exports = model('Clientes', clientesSchema);
/* Mongo Schema: Clientes */
import { Schema, model } from 'mongoose';

const productosSchema = new Schema({
    nombre: String,
    precio: Number,
    stock: Number
}, {
    timestamps: true // Fecha de creación y actualización
});

module.exports = model('Productos', productosSchema);
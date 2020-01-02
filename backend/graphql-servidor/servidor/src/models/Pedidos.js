/* Mongo Schema: Clientes */
import { Schema, model } from 'mongoose';

const pedidosSchema = new Schema({
    pedido: Array, // [Id del producto, Cantidad]
    total: Number,
    fecha: Date,
    cliente: String,
    estado: String
}, {
    timestamps: true // Fecha de creación y actualización
});

module.exports = model('Pedidos', pedidosSchema);
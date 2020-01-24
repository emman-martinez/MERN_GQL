/* Mongo Schema: Pedidos */
import { Schema, model } from 'mongoose';

const pedidosSchema = new Schema({
    pedido: Array, // [Id del producto, Cantidad]
    total: Number,
    fecha: Date,
    cliente: Schema.Types.ObjectId, //cliente: String,
    estado: String,
    vendedor: Schema.Types.ObjectId
}, {
    timestamps: true // Fecha de creación y actualización
});

module.exports = model('Pedidos', pedidosSchema);
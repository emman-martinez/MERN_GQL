/* Mongo Schema: Clientes */
import { Schema, model, Mongoose } from 'mongoose';

const clientesSchema = new Schema({
    nombre: String,
    apellido: String,
    empresa: String,
    emails: Array,
    edad: Number,
    tipo: String,
    pedidos: Array,
    vendedor: Schema.Types.ObjectId 
}, {
    timestamps: true // Fecha de creación y actualización
});

module.exports = model('Clientes', clientesSchema);
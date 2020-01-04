import { rejects } from 'assert';
const Clientes = require('./../models/Clientes');
const Productos = require('./../models/Productos');
const Pedidos = require('./../models/Pedidos');

export const resolvers = {
    Query: {
        // ***** Q: CLIENTES ***** //
        getClientes: (root, { limite, offset }) => {
            return Clientes.find({}).limit(limite).skip(offset)
        },
        getCliente: (root, { id }) => {
            return new Promise((resolve, object) => {
                Clientes.findById(id, (error, cliente) => {
                    if (error) rejects(error)
                    else resolve(cliente)
                });
            });
        },
        totalClientes: (root) => {
            return new Promise((resolve, object) => {
                Clientes.countDocuments({}, (error, count) => {
                    if (error) rejects(error)
                    else resolve(count)
                });
            });
        },
        // ***** Q: PRODUCTOS ***** //
        obtenerProductos: (root, { limite, offset, stock }) => {
            let filtro;
            if(stock) {
                filtro = { stock: {$gt: 0}} // Función de MongoDB para revisar el campo y valor para filtrar
            }
            return Productos.find(filtro).limit(limite).skip(offset)
        },
        obtenerProducto: (root, { id }) => {
            return new Promise((resolve, object) => {
                Productos.findById(id, (error, producto) => {
                    if (error) rejects(error)
                    else resolve(producto)
                });
            });
        },
        totalProductos: (root) => {
            return new Promise((resolve, object) => {
                Productos.countDocuments({}, (error, count) => {
                    if (error) rejects(error)
                    else resolve(count)
                });
            });
        },
        // ***** Q: PEDIDOS ***** //
        //getPedidos: (root, { limite, offset }) => {
        //  return Pedidos.find({}).limit(limite).skip(offset)
        //},
    },
    Mutation: {
        // ***** M: CLIENTES ***** //
        crearCliente: (root, { input }) => {
            const nuevoCliente = new Clientes({
                nombre: input.nombre,
                apellido: input.apellido,
                empresa: input.empresa,
                emails: input.emails,
                //email: input.email, 
                edad: input.edad,
                tipo: input.tipo,
                pedidos: input.pedidos
            });
            nuevoCliente.id = nuevoCliente._id;
            return new Promise((resolve, object) => {
                nuevoCliente.save((error) => {
                    if (error) rejects(error)
                    else resolve(nuevoCliente)
                })
            });
        },
        actualizarCliente: (root, { input }) => {
            return new Promise((resolve, object) => {
                Clientes.findOneAndUpdate({ _id: input.id }, input, { new: true }, (error, cliente) => {
                    if (error) rejects(error)
                    else resolve(cliente)
                });
            });
        },
        eliminarCliente: (root, { id }) => {
            return new Promise((resolve, object) => {
                Clientes.findOneAndDelete({ _id: id }, (error) => {
                    if (error) rejects(error)
                    else resolve("El Cliente se Eliminó Correctamente")
                });
            });
        },
        // ***** M: PRODUCTOS ***** //
        nuevoProducto: (root, { input }) => {
            const nuevoProducto = new Productos({
                nombre: input.nombre,
                precio: input.precio,
                stock: input.stock
            });
            // MongoDB crea el ID que se asigna al objeto
            nuevoProducto.id = nuevoProducto._id;

            return new Promise((resolve, object) => {
                nuevoProducto.save((error) => {
                    if (error) rejects(error)
                    else resolve(nuevoProducto)
                });
            });
        },
        actualizarProducto: (root, { input }) => {
            return new Promise((resolve, producto) => {
                Productos.findOneAndUpdate({ _id: input.id }, input, { new: true }, (error, producto) => {
                    if (error) rejects(error)
                    else resolve(producto)
                });
            });
        },
        eliminarProducto: (root, { id }) => {
            return new Promise((resolve, producto) => {
                Productos.findOneAndDelete({ _id: id }, (error) => {
                    if (error) rejects(error)
                    else resolve("El Producto se Eliminó Correctamente")
                });
            });
        },
        // ***** M: PEDIDOS ***** //
        nuevoPedido: (root, { input }) => { // input: Variable que se lee desde ReactJS
            const nuevoPedido = new Pedidos({
                pedido: input.pedido,
                total: input.total,
                fecha: new Date(),
                cliente: input.cliente,
                estado: "PENDIENTE"
            });
            nuevoPedido.id = nuevoPedido._id;
            return new Promise((resolve, object) => { // Mutation --> Graphql con Mongoose --> return Promise
                // Recorrer y actualizar la cantidad de productos
                input.pedido.forEach(pedido => {
                    Productos.updateOne({ _id: pedido.id }, // Método de Mongoose
                        {
                            "$inc": // Función de MongooDB
                            { "stock": -pedido.cantidad }
                        },
                        function(error) {

                            if (error) return new Error(error)

                        }
                    );
                });
                nuevoPedido.save((error) => { // save método de mongoose
                    if (error) rejects(error)
                    else resolve(nuevoPedido)
                })
            });
        }
    }
}
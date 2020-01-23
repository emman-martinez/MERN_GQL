import { rejects } from 'assert';
const Clientes = require('./../models/Clientes');
const Productos = require('./../models/Productos');
const Pedidos = require('./../models/Pedidos');
const Usuarios = require('./../models/Usuarios');
import bcrypt from 'bcryptjs';
import { Schema, Mongoose } from 'mongoose';

// const ObjectId = Schema.Types.ObjectId; // Convertir String a ObjectId

// Generar Token
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import jwt from 'jsonwebtoken';

const crearToken = (usuarioLogin, secreto, expiresIn) => {
    const { usuario } = usuarioLogin;

    return jwt.sign({ usuario }, secreto, { expiresIn });
};

export const resolvers = {
    Query: {
        // ***** Q: CLIENTES ***** //
        getClientes: (root, { limite, offset, vendedor }) => {
            let filtro;
            if (vendedor) {
                filtro = { vendedor } //{ vendedor: new ObjectId(vendedor) }
            }
            return Clientes.find(filtro).limit(limite).skip(offset)
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
            if (stock) {
                filtro = { stock: { $gt: 0 } } // Función de MongoDB para revisar el campo y valor para filtrar
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
        obtenerPedidos: (root, { cliente }) => {
            return new Promise((resolve, object) => {
                Pedidos.find({ cliente: cliente }, (error, pedido) => {
                    if (error) rejects(error);
                    else resolve(pedido);
                })
            })
        },
        topClientes: (root) => {
            return new Promise((resolve, object) => {
                Pedidos.aggregate([{
                        $match: { estado: "COMPLETADO" }
                    },
                    {
                        $group: {
                            _id: "$cliente",
                            total: { $sum: "$total" }
                        }
                    },
                    {
                        $lookup: {
                            from: "clientes",
                            localField: '_id',
                            foreignField: '_id',
                            as: 'cliente'
                        }
                    },
                    {
                        $sort: { total: -1 }
                    },
                    {
                        $limit: 10
                    }
                ], (error, resultado) => {
                    if (error) rejects(error);
                    else resolve(resultado);
                })
            })
        },
        // ***** Q: USUARIOS ***** //
        obtenerUsuario: (root, args, { usuarioActual }) => {
            if (!usuarioActual) {
                return null;
            }
            console.log(usuarioActual);

            // Obtener el usuario actual del request del JWT verificado
            const usuario = Usuarios.findOne({ usuario: usuarioActual.usuario });

            return usuario;
        }
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
                pedidos: input.pedidos,
                vendedor: input.vendedor
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
                nuevoPedido.save((error) => { // save método de mongoose
                    if (error) rejects(error)
                    else resolve(nuevoPedido)
                })
            });
        },
        actualizarEstado: (root, { input }) => {
            return new Promise((resolve, object) => {
                // Recorrer y actualizar la cantidad de productos con base al estado del pedido
                console.log(input);
                const { estado } = input;

                let instruccion;

                if (estado === 'COMPLETADO') {
                    instruccion = '-';
                } else if (estado === 'CANCELADO') {
                    instruccion = '+';
                }

                input.pedido.forEach(pedido => {
                    Productos.updateOne({ _id: pedido.id }, // Método de Mongoose
                        {
                            "$inc": // Función de MongooDB
                            { "stock": `${instruccion}${pedido.cantidad}` }
                        },
                        function(error) {

                            if (error) return new Error(error)

                        }
                    );
                });
                Pedidos.findOneAndUpdate({ _id: input.id }, input, { new: true }, (error) => {
                    if (error) rejects(error);
                    else resolve('Se actualizó correctamente');
                })
            })
        },
        // ***** M: USUARIOS ***** //
        crearUsuario: async(root, { usuario, nombre, password, rol }) => {

            // Revisar si un usuario contiene password repetido
            const existeUsuario = await Usuarios.findOne({ usuario: usuario }); // Método de mongoose

            if (existeUsuario) {
                throw new Error('El usuario ya existe');
            }

            const nuevoUsuario = await new Usuarios({
                usuario,
                nombre,
                password,
                rol
            }).save();

            console.log(nuevoUsuario);

            return "Usuario Creado Correctamente";
        },
        autenticarUsuario: async(root, { usuario, password }) => {
            const nombreUsuario = await Usuarios.findOne({ usuario });

            if (!nombreUsuario) {
                throw new Error('Usuario no encontrado');
            }

            const passwordCorrecto = await bcrypt.compare(password, nombreUsuario.password);

            // Si el password es incorrecto
            if (!passwordCorrecto) {
                throw new Error('Password Incorrecto');
            }

            return { // Si existe el usuario y el password es correcto
                token: crearToken(nombreUsuario, process.env.SECRETO, '1hr')
            }
        }
    }
}
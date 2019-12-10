import React, { Component, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { OBTENER_PRODUCTOS } from './../../queries';
import { ELIMINAR_PRODUCTO } from './../../mutations';
import Exito from './../Alertas/Exito';
import { Link } from 'react-router-dom';
import Paginador from '../Paginador';

class Productos extends Component {

    limite = 2;
    
    state = { 
        paginador: {
            offset: 0,
            actual: 1
        },
        alerta: {
            mostrar: false,
            mensaje: ''
        }
    }

    paginaAnterior = () => {
        console.log('Anterior...');
        this.setState({
            paginador: {
                offset: this.state.paginador.offset - this.limite,
                actual: this.state.paginador.actual - 1
            }
        })
    }

    paginaSiguiente = () => {
        console.log('Siguiente...');
        this.setState({
            paginador: {
                offset: this.state.paginador.offset + this.limite,
                actual: this.state.paginador.actual + 1
            }
        })
    }

    render() {

        const { alerta: { mostrar, mensaje } } = this.state;

        const alerta = (mostrar) ? <Exito mensaje={mensaje}/> : '';

        return (
            <Fragment>
                <h1 className="text-center mb-5">Productos</h1>

                {alerta}

                <Query query={ OBTENER_PRODUCTOS } pollInterval={1000} variables={{limite: this.limite, offset: this.state.paginador.offset}}>

                    {({ loading, error, data, startPolling, stopPolling }) => {
                        if(loading) return "Cargando...";
                        if(error) return `Error: ${error.message}`;
                        console.log('data: ', data);
                        console.log('getProductos: ', data.obtenerProductos); 
                        // console.log('totalClientes: ', data.totalClientes); 
                        const productos = data.obtenerProductos;
                        const totalProductos = data.totalProductos;

                        return(
                            <Fragment>
                                <table className="table">
                                    <thead>
                                        <tr className="table-primary">
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Precio</th>
                                            <th scope="col">Existencia</th>
                                            <th scope="col">Eliminar</th>
                                            <th scope="col">Editar</th>
                                        </tr>
                                    </thead>
                                
                                    <tbody>
                                        {productos.map(producto => {

                                            const { id } = producto;

                                            return(
                                                <tr key={id}>
                                                    <td>{producto.nombre}</td>
                                                    <td>{producto.precio}</td>
                                                    <td>{producto.stock}</td>
                                                    <td>
                                                        <Mutation 
                                                            mutation={ELIMINAR_PRODUCTO}
                                                            onCompleted={(data) => {
                                                                // console.log(data);
                                                                this.setState({
                                                                    alerta: {
                                                                        mostrar: true,
                                                                        mensaje: data.eliminarProducto
                                                                    }
                                                                }, () => {
                                                                    setTimeout(() => {
                                                                        this.setState({
                                                                            alerta: {
                                                                                mostrar: false,
                                                                                mensaje: ''
                                                                            }
                                                                        })
                                                                    }, 3000); 
                                                                })
                                                            }}
                                                        >
                                                            {
                                                                eliminarProducto => (
                                                                    <button
                                                                        onClick={ () => {
                                                                                        //console.log(producto.id);
                                                                                        if(window.confirm('¿Seguro que deseas eliminar este Producto?')) {
                                                                                            eliminarProducto({
                                                                                                variables: {id}
                                                                                            })
                                                                                        }
                                                                                    }
                                                                                }
                                                                        type="button"
                                                                        className="btn btn-danger"
                                                                    >
                                                                        &times; Eliminar  
                                                                    </button>
                                                                )
                                                            }
                                                        </Mutation>
                                                    </td>
                                                    <td>
                                                        <Link to={`/productos/editar/${id}`} className="btn btn-success">
                                                            Editar Producto
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        
                                        })}
                                    </tbody>
                                </table>
                                <Paginador
                                    actual={this.state.paginador.actual}
                                    total={totalProductos}
                                    limite={this.limite}
                                    paginaAnterior={this.paginaAnterior}
                                    paginaSiguiente={this.paginaSiguiente}
                                />
                            </Fragment>
                        );
                    }}
                </Query>
            </Fragment>
        );
    }
}

export default Productos;
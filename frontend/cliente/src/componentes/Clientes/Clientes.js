import React, { Component, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { CLIENTES_QUERY } from './../../queries';
import { ELIMINAR_CLIENTE } from './../../mutations';
import Exito from './../Alertas/Exito';
import Paginador from '../Paginador';

class Clientes extends Component {

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
            <Query query={ CLIENTES_QUERY } pollInterval={1000} variables={{limite: this.limite, offset: this.state.paginador.offset}}> 

                {({ loading, error, data, startPolling, stopPolling }) => {
                    if(loading) return "Cargando...";
                    if(error) return `Error: ${error.message}`;
                    // console.log('data: ', data);
                    console.log('getClientes: ', data.getClientes); 
                    console.log('totalClientes: ', data.totalClientes);
                    const clientes = data.getClientes;
                    const totalClientes = data.totalClientes;

                    return(
                        <Fragment>
                            <h2 className="text-center mt-4">Listado Clientes</h2>
                            {alerta}
                            <ul className="list-group mt-4">
                                {
                                    clientes.map(cliente => {
                                            
                                            const { id } = cliente;
                                            
                                            return(
                                                <li key={cliente.id} className="list-group-item">
                                                    <div className="row justify-content-between align-items-center">
                                                        <div className="col-md-8 d-flex justify-content-between align-items-center">
                                                            { cliente.nombre } { cliente.apellido } - { cliente.empresa }
                                                        </div>
                                                        <div className="col-md-4 d-flex justify-content-end">
                                                            <Link
                                                                to={`/pedidos/nuevo/${id}`}
                                                                className="btn btn-warning d-block d-md-inline-block mr-2"
                                                            >
                                                                &#43; Nuevo Pedido
                                                            </Link>
                                                            <Link
                                                                to={`/pedidos/${id}`}
                                                                className="btn btn-primary d-block d-md-inline-block mr-2"
                                                            >
                                                                Ver Pedidos
                                                            </Link>
                                                            <Mutation 
                                                                mutation={ELIMINAR_CLIENTE}
                                                                onCompleted={(data) => {
                                                                    console.log(data);
                                                                    this.setState({
                                                                        alerta: {
                                                                            mostrar: true,
                                                                            mensaje: data.eliminarCliente
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
                                                                    eliminarCliente => (
                                                                        <button 
                                                                            type="button" 
                                                                            className="btn btn-danger d-block d-md-inline-block mr-2"
                                                                            onClick={ () => {
                                                                                //console.log(cliente.id);
                                                                                if(window.confirm('¿Seguro que deseas eliminar este Cliente?')) {
                                                                                    eliminarCliente({
                                                                                        variables: {id}
                                                                                    })
                                                                                }
                                                                            }}
                                                                        >
                                                                            &times; Eliminar 
                                                                        </button>
                                                                    )
                                                                }
                                                            </Mutation>
                                                            <Link 
                                                                to={`/clientes/editar/${cliente.id}`} 
                                                                className="btn btn-success d-block d-md-inline-block"
                                                            >
                                                                Editar Cliente
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        }   
                                    )
                                }
                            </ul>
                            <Paginador
                                actual={this.state.paginador.actual}
                                total={totalClientes} 
                                limite={this.limite}
                                paginaAnterior={this.paginaAnterior}
                                paginaSiguiente={this.paginaSiguiente}
                            />
                        </Fragment>
                    );
                }}
            </Query> 
        );
    }
}

export default Clientes;
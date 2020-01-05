import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { OBTENER_PEDIDOS } from './../../queries';
import Pedido from './Pedido';
import './../../spinner.css';

const PedidosCliente = (props) => {

    // console.log(props);
    const cliente = props.match.params.id;
    console.log(cliente);

    return (
        <Fragment>
            <h1 className="text-center mb-5">Pedidos del Cliente</h1>
            <div className="row">
                <Query query={OBTENER_PEDIDOS} variables={{cliente}} pollInterval={500}>
                    {
                        ({loading, error, data, startPolling, stopPolling}) => {
                            if(loading) return(
                                <div className="sk-folding-cube">
                                    <div className="sk-cube1 sk-cube"></div>
                                    <div className="sk-cube2 sk-cube"></div>
                                    <div className="sk-cube4 sk-cube"></div>
                                    <div className="sk-cube3 sk-cube"></div>
                                </div>
                            );
                            if(error) return `Error ${error.message}`;

                            console.log(data);

                            const { obtenerPedidos } = data;
                            const pedidos = obtenerPedidos;
                            console.log('Pedidos: ', pedidos);

                            return(
                                pedidos.map(pedido => {
                                    return(
                                        <Pedido
                                            key={pedido.id}
                                            pedido={pedido}
                                            cliente={cliente}
                                        />
                                    );
                                })
                            );
                        }
                    }
                </Query>
            </div>
        </Fragment>
    );
}

export default PedidosCliente;
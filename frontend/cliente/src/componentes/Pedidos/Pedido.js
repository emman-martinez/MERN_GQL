import React from 'react';

const Pedido = (props) => {
    // console.log(props);

    const { pedido } = props;
    console.log('Pedido: ', pedido);
    console.log(Number(pedido.fecha));
    const fecha = new Date(Number(pedido.fecha));

    return (
        <div className="col-md-4">
            <div className={`card mb-3`} >
                <div className="card-body">
                    <p className="card-text font-weight-bold ">Estado:
                            <select 
                                className="form-control my-3"
                                value={pedido.estado}
                            >
                                    <option value="PENDIENTE">PENDIENTE</option>
                                    <option value="COMPLETADO">COMPLETADO</option>
                                    <option value="CANCELADO">CANCELADO</option>
                            </select>
                    </p> 
                    <p className="card-text font-weight-bold">Pedido ID: 
                        <span className="font-weight-normal"> {pedido.id}</span>
                    </p> 
                    <p className="card-text font-weight-bold">Fecha Pedido: 
                        <span className="font-weight-normal"> {fecha.toLocaleString("es-MX")}</span>
                    </p>
                    <p className="card-text font-weight-bold">Total: 
                        <span className="font-weight-normal"> $ {pedido.total}</span>
                    </p>

                    <h3 className="card-text text-center mb-3">Artículos del pedido</h3>
                </div>
            </div>
        </div>
    );
}

export default Pedido;
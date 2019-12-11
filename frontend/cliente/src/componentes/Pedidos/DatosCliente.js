import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { CLIENTE_QUERY } from './../../queries';
import './../../spinner.css';

const DatosCliente = ({id}) => {
    return (
        <Fragment>
            <h2 className="text-center mb-3">Resumen del Cliente</h2>

            <Query 
                query={CLIENTE_QUERY} 
                variables={{id}}
                pollInterval={500}
            >
                {
                    ({ loading, error, data, startPolling, stopPolling}) => {
                        if(loading) return (
                            <div className="sk-fading-circle">
                                <div className="sk-circle1 sk-circle"></div>
                                <div className="sk-circle2 sk-circle"></div>
                                <div className="sk-circle3 sk-circle"></div>
                                <div className="sk-circle4 sk-circle"></div>
                                <div className="sk-circle5 sk-circle"></div>
                                <div className="sk-circle6 sk-circle"></div>
                                <div className="sk-circle7 sk-circle"></div>
                                <div className="sk-circle8 sk-circle"></div>
                                <div className="sk-circle9 sk-circle"></div>
                                <div className="sk-circle10 sk-circle"></div>
                                <div className="sk-circle11 sk-circle"></div>
                                <div className="sk-circle12 sk-circle"></div>
                            </div>
                        );
                        if(error) return `Error ${error.message}`;
                        // console.log(data.getCliente);
                        const { nombre, apellido, edad, emails, empresa, tipo } = data.getCliente;

                        return(
                            <ul className="list-unstyled my-5">
                                <li className="border font-weight-bold p-2">Nombre:
                                    <span className="font-weight-normal"> {nombre}</span>
                                </li>
                                <li className="border font-weight-bold p-2">Apellido:
                                    <span className="font-weight-normal"> {apellido}</span>
                                </li>
                                <li className="border font-weight-bold p-2">Edad:
                                    <span className="font-weight-normal"> {edad}</span>
                                </li>
                                <li className="border font-weight-bold p-2">Emails:
                                    <span className="font-weight-normal"> {emails.map(email => ` ${email.email}`)}</span>
                                </li>
                                <li className="border font-weight-bold p-2">Empresa:
                                    <span className="font-weight-normal"> {empresa}</span>
                                </li>
                                <li className="border font-weight-bold p-2">Tipo:
                                    <span className="font-weight-normal"> {tipo}</span>
                                </li>
                            </ul> 
                        );
                    }
                }
            </Query>
        </Fragment>
    );
}
 
export default DatosCliente;
import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const cerrarSesionUsuario = (cliente, history) => {
    localStorage.removeItem('token', '');
    // Desloguear Usuario
    cliente.resetStore();
    // Redireccionar al usuario
    history.push('/login');
};

const CerrarSesion = ({history}) => {
    return (
        <ApolloConsumer>
            { cliente => {
                return(
                    <button 
                        onClick={() => cerrarSesionUsuario(cliente, history)}
                        className="btn btn-light ml-md-2 mt-2 mt-md-0"
                    >
                        Cerrar Sesión
                    </button>
                );
            }}
        </ApolloConsumer>
    );
};

export default withRouter(CerrarSesion);
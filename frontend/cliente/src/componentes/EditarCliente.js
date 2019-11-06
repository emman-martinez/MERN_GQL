import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { CLIENTE_QUERY } from './../queries';
import FormularioEditarCliente from './FormularioEditarCliente';

class EditarCliente extends Component {

    state = {  }

    render() { 
        // Tomar el Id del contacto a Editar
        const { id } = this.props.match.params;
        console.log(id);

        return ( 

            <Fragment>

                <h2 className="text-center mt-4">Editar Cliente</h2>
            
                <div className="row justify-content-center">
                    <Query query={CLIENTE_QUERY} variables={{id}}>
                        {({ loading, error, data }) => {
                            if(loading) return 'Cargando...';
                            if(error) return `¡Error! ${error.message}`;
                            console.log(data);
                            return(
                                <FormularioEditarCliente/>
                            );
                        }}
                    </Query>
                </div>

            </Fragment>

         ); 
    }
}
 
export default EditarCliente;
import React, { Component } from 'react';

class Paginador extends Component {

    state = {
        paginador: {
            paginas: Math.ceil(Number(this.props.totalClientes) / this.props.limite)
        }
    }

    render() {

        const { actual } = this.props;
        const { paginas } = this.state.paginador;  
        // console.log(actual);
        // console.log(paginas);
        
        // Botón Anterior
        const btnAnterior = (actual > 1) 
                            ? <button onClick={this.props.paginaAnterior} type="button" className="btn btn-success mr-2 mb-2">&laquo; Anterior</button>
                            : '';
        // Botón Siguiente 
        const btnSiguiente = (actual !== paginas)
                                ? <button onClick={this.props.paginaSiguiente} type="button" className="btn btn-success mb-2">Siguiente &raquo;</button>
                                : '';      
                                                

        return (
            <div className="mt-5 d-flex justify-content-center">
                {btnAnterior}
                {btnSiguiente}
            </div>
        );

    }
}

export default Paginador;
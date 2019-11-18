import React, { Component, Fragment } from 'react';

class NuevoProducto extends Component {
    
    state = {
        nombre: '',
        precio: '',
        stock: ''
    }

    actualizarState = e => {
        const {name, value} = e.target;
        console.log(name, ':', value);
        this.setState({
            [name]: value
        })
    }

    validarForm = () => {
        const { nombre, precio, stock } = this.state;
        const noValido = !nombre || !precio || !stock;
        // console.log(noValido);
        return noValido;
    }

    render() {

        return (
            <Fragment>

                <h2 className="text-center mb-5">Nuevo Producto</h2>

                {/*respuesta*/}

                <div className="row justify-content-center">
                
                    <form 
                        className="col-md-8"
                    >
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input 
                                type="text"
                                name="nombre" 
                                className="form-control" 
                                placeholder="Nombre del Producto"
                                onChange={this.actualizarState}
                            />
                        </div>
                        <div className="form-group">
                            <label>Precio:</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">$</div>
                                </div>
                                <input 
                                    type="number" 
                                    name="precio" 
                                    className="form-control" 
                                    placeholder="Precio del Producto"
                                    onChange={this.actualizarState}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Stock:</label>
                            <input 
                                type="number" 
                                name="stock" 
                                className="form-control" 
                                placeholder="Stock del Producto" 
                                onChange={this.actualizarState}
                            />
                        </div>
                        <button 
                            disabled={this.validarForm()}
                            type="submit" 
                            className="btn btn-success float-right">
                                Crear Producto
                        </button>
                    </form>

                </div>

            </Fragment>
        );
    }
}

export default NuevoProducto;
import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import Animated from 'react-select/animated';
import Resumen from './Resumen';
import GenerarPedido from './GenerarPedido';
import Error from './../Alertas/Error';

// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' }
// ]

class ContenidoPedido extends Component {

    state = {
        productos: [],
        total: 0
    }

    seleccionarProducto = (productos) => {
        // console.log(`Algo pasó con`, productos);
        this.setState({
            productos
        })
    }

    actualizarTotal = () => {
        // Leer el state de productos
        const productos = this.state.productos;
        // Cuando los productos están en cero
        if(productos.length === 0) {
            this.setState({
                total: 0
            });
            return;
        }
        let nuevoTotal = 0;
        
        // Realizar la operación de cantidad x precio
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));

        this.setState({
            total: nuevoTotal
        })

    }

    actualizarCantidad = (cantidad, index) => {
        // console.log(cantidad);

        // Leer el state de productos
        const productos = this.state.productos;
        // Agregar la cantidad desde la interfaz
        productos[index].cantidad = Number(cantidad);

        // Actualizar la cantidad de los productos

        // Validación

        // Agregar al state
        this.setState({
            productos
        }, () => {
            this.actualizarTotal();
        })

    }

    eliminarProducto = (id) => {
        // console.log(id);
        const productos = this.state.productos;

        const productosRestantes = productos.filter(producto => producto.id !== id);

        this.setState({
            productos: productosRestantes
        }, () => {
            this.actualizarTotal();
        })
    }

    render() {

        const mensaje = (this.state.total < 0) 
                        ? <Error error="Las Cantidades no pueden ser Negativas"/> 
                        : '';

        return (
            <Fragment>
                <h2 className="text-center mb-5">Seleccionar Artículos</h2>
                {mensaje}
                <Select 
                    onChange={this.seleccionarProducto}
                    options={this.props.productos} 
                    isMulti={true}
                    components={Animated()}
                    placeholder={'Seleccionar Productos'}
                    getOptionValue={(options) => options.id}
                    getOptionLabel={(options) => options.nombre}
                    value={this.state.productos}
                />
                <Resumen
                    productos={this.state.productos}
                    actualizarCantidad={this.actualizarCantidad}
                    eliminarProducto={this.eliminarProducto}
                />
                <p className="font-weight-bold float-right mt-3">
                    Total:
                    <span className="font-weight-normal">
                        $ {this.state.total}
                    </span>
                </p>
                <GenerarPedido
                    productos={this.state.productos}
                    total={this.state.total}
                    idCliente={this.props.id}
                />
            </Fragment>
        );
    }
}

export default ContenidoPedido;
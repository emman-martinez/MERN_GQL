import React, { Component, Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootswatch/dist/flatly/bootstrap.min.css';

// Importar componentes
import Header from './componentes/Layout/Header';
import Clientes from './componentes/Clientes/Clientes';
import EditarCliente from './componentes/Clientes/EditarCliente';
import NuevoCliente from './componentes/Clientes/NuevoCliente';

import NuevoProducto from './componentes/Productos/NuevoProducto'; 
import Productos from './componentes/Productos/Productos';
import EditarProducto from './componentes/Productos/EditarProducto';

import NuevoPedido from './componentes/Pedidos/NuevoPedido'; 
import PedidosCliente from './componentes/Pedidos/PedidosCliente';

import Panel from './componentes/Panel/Panel';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({networkError, graphQLErrors}) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError); 
  } 
});

class App extends Component {
  render() {
    return(
      <ApolloProvider client={client}>
        <Router>
          <Fragment>
            { /* ***** Componente: Header ***** */ }
            <Header/>
            <div className="container">
              <Switch>
                { /* ***** CLIENTES ***** */ }
                { /* ***** Route --> Componente: Clientes ***** */ }
                <Route exact path="/clientes" component={Clientes}/>
                { /* ***** Route --> Componente: EditarCliente ***** */ }
                <Route exact path="/clientes/editar/:id" component={EditarCliente}/>
                { /* ***** Route --> Componente: NuevoCliente ***** */ }
                <Route exact path="/clientes/nuevo" component={NuevoCliente}/>
                { /* ***** PRODUCTOS ***** */ } 
                { /* ***** Route --> Componente: Productos ***** */ }
                <Route exact path="/productos" component={Productos}/>
                { /* ***** Route --> Componente: EditarProducto ***** */ }
                <Route exact path="/productos/editar/:id" component={EditarProducto}/> 
                { /* ***** Route --> Componente: NuevoProducto ***** */ }
                <Route exact path="/productos/nuevo" component={NuevoProducto}/>
                { /* ***** PEDIDOS ***** */ }
                { /* ***** Route --> Componente: NuevoProducto ***** */ }
                <Route exact path="/pedidos/nuevo/:id" component={NuevoPedido}/>
                { /* ***** Route --> Componente: PedidosCliente ***** */ }
                <Route exact path="/pedidos/:id" component={PedidosCliente}/>
                { /* ***** PANEL: Gráficas ***** */ }
                <Route exact path="/panel" component={Panel}/>
              </Switch>
            </div>
          </Fragment>
        </Router> 
      </ApolloProvider>
    );
  }
}

export default App;

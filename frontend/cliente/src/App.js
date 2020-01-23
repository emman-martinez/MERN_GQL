import React, { Fragment } from 'react';
// import { ApolloProvider } from 'react-apollo';
// import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
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
import Registro from './componentes/Auth/Registro';
import Login from './componentes/Auth/Login';
import Session from './componentes/Session';

const App = ({refetch, session}) => {

  console.log('Session: ', session);

  const { obtenerUsuario } = session;
  const mensaje = (obtenerUsuario) ? `Bienvenido: ${obtenerUsuario.nombre}` : <Redirect to="/login"/>;

  return(
    
      <Router>
        <Fragment>
          { /* ***** Componente: Header ***** */ }
          <Header session={session}/>
          <div className="container">
            <p className="text-right">{ mensaje }</p>
            <Switch>
              { /* ***** CLIENTES ***** */ }
              { /* ***** Route --> Componente: Clientes ***** */ }
              <Route exact path="/clientes" render={ () => <Clientes session={session}/>}/> 
              { /* ***** Route --> Componente: EditarCliente ***** */ }
              <Route exact path="/clientes/editar/:id" component={EditarCliente}/>
              { /* ***** Route --> Componente: NuevoCliente ***** */ }
              <Route exact path="/clientes/nuevo" render={ () => <NuevoCliente session={session}/>}/>
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
              { /* ***** USUARIOS ***** */ }
              { /* ***** Route --> Componente: Registro ***** */ }
              <Route exact path="/registro" component={Registro}/>
              { /* ***** Route --> Componente: Login ***** */ }
              <Route exact path="/login" render={() => <Login refetch={refetch}/>} />
              { /* ***** PANEL: Gráficas ***** */ }
              { /* ***** Route --> Componente: Panel ***** */ }
              <Route exact path="/panel" component={Panel}/>
            </Switch>
          </div>
        </Fragment>
      </Router> 
  );
};

const RootSession = Session(App);

export { RootSession }

//export default App;



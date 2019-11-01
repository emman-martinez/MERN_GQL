import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import 'bootswatch/dist/flatly/bootstrap.min.css';

// Importar componentes
import Header from './componentes/Header';
import Clientes from './componentes/Clientes';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  onError: ({networkError, graphQLErrors}) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  }
});

class App extends Component {
  render() {
    return(
      <ApolloProvider client={client}>
        { /* ***** Componente: Header ***** */ }
        <Header/>
        <div className="container">
          { /* ***** Componente: Clientes ***** */ }
          <Clientes/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;

/* ***** Servidor con Apollo ***** */
import express from 'express'; // ExpressJS
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './data/schema'; // typeDefs
import { resolvers } from './data/resolvers';
require('dotenv').config();
require('colors');
require('./data/db');

const app = express();
const port = 4000;
const server = new ApolloServer({ typeDefs, resolvers });
const graphqlPath = server.graphqlPath;

server.applyMiddleware({ app }); // Conexión de Apollo Server con Express
app.listen(port, () => {
    console.log('Apollo Server on http://localhost:'.cyan + port + graphqlPath);
});

/* ***** Servidor con GraphQL ***** */

// import express from 'express'; // ExpressJS
// import graphqlHTTP from 'express-graphql'; // GraphQL
// import { schema } from './data/schema'; // Schema
// require('dotenv').config();
// require('colors');
// require('./data/db');

// const app = express();
// const port = 8000;

// app.get('/', (req, res) => {
//     res.send('Todo Listo');
// });

// app.use('/graphql', graphqlHTTP({
//     //  Que schema va a utilizar
//     schema,
//     // Utilizar graphiql 
//     graphiql: true
// }));

// app.listen(port, () => {
//     console.log('Server on Port'.cyan, port);
// });
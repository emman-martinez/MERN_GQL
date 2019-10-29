/* ***** Servidor ***** */
import express from 'express'; // ExpressJS
import graphqlHTTP from 'express-graphql'; // GraphQL
import { schema } from './data/schema'; // Schema
require('dotenv').config();
require('colors');
require('./data/db');

const app = express();
const port = 8000;

app.get('/', (req, res) => {
    res.send('Todo Listo');
});

app.use('/graphql', graphqlHTTP({
    //  Que schema va a utilizar
    schema,
    // Utilizar graphiql 
    graphiql: true
}));

app.listen(port, () => {
    console.log('Server on Port'.cyan, port);
});
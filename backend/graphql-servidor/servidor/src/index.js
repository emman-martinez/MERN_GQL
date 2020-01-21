/* ***** Servidor con Apollo ***** */
import express from 'express'; // ExpressJS
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './data/schema'; // typeDefs
import { resolvers } from './data/resolvers';
import jwt from 'jsonwebtoken';
require('dotenv').config({ path: '.env' });
require('colors');
require('./data/db');

const app = express();
const port = 4000;
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async({ req }) => { // Comunicación Cliente-Servidor (setContext-context)
        // Obtener el token del servidor
        const token = req.headers['authorization'];
        // console.log(token);

        if (token !== "null") {
            try {

                // Verificar el token del frontend (Cliente)
                const usuarioActual = await jwt.verify(token, process.env.SECRETO);
                // console.log(usuarioActual);

                // Agregamos el usuario actual al request
                req.usuarioActual = usuarioActual;

                return {
                    usuarioActual
                }

            } catch (err) {
                console.log(err);
            }
        }
    }
});

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
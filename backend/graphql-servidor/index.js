import express from 'express';
// GraphQL
import graphqlHTTP from 'express-graphql';
import schema from './schema';

const app = express();
const port = 8000;

app.get('/',(req, res) => {
    res.send('Todo Listo');
});

// El Resolver
const root = {
    cliente: () => {
        return {
            "id": 123456789,
            "nombre": "Emmanuel",
            "apellido": "Martínez",
            "empresa": "Administrategia",
            "email": "correo@correo.com"
        }
    }
};

app.use('/graphql', graphqlHTTP({
    //  Que schema va a utilizar
    schema,
    // El resolver se pasa como rootValue
    rootValue: root,
    // Utilizar graphiql 
    graphiql: true
}));

app.listen(port, () => {
    console.log('El Servidor esta funcionando correctamente');
}); 
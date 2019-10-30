/* ***** Schema para Apollo Server ***** */
import { importSchema } from 'graphql-import';
const typeDefs = importSchema('src/data/schema.graphql');
export { typeDefs };


/* ************************************************************** */
/* ***** Schema para GraphQL ***** */

// import { resolvers } from './resolvers';
// import { importSchema } from 'graphql-import';
// import { makeExecutableSchema } from 'graphql-tools';

// const typeDefs = importSchema('src/data/schema.graphql');

// const schema = makeExecutableSchema({ typeDefs, resolvers });

// export { schema };
/* ************************************************************** */
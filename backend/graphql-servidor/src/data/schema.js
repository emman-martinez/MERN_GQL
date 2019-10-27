import { resolvers } from './resolvers';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = importSchema('src/data/schema.graphql');

const schema = makeExecutableSchema({ typeDefs, resolvers });

export { schema };
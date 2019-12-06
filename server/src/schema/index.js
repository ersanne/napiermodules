import { SchemaComposer } from 'graphql-compose';

import mongo from '../utils/mongo'; // eslint-disable-line no-unused-vars

const schemaComposer = new SchemaComposer();

// import { UserQuery, UserMutation } from './user';
import { ModuleQuery, ModuleMutation } from './module';

schemaComposer.Query.addFields({
    // ...UserQuery,
    ...ModuleQuery,
});

schemaComposer.Mutation.addFields({
    // ...UserMutation,
    ...ModuleMutation,
});

export default schemaComposer.buildSchema();
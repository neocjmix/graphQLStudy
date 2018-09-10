import express from 'express'
import graphqlHTTP from 'express-graphql'
import * as Graphql from 'graphql'
import {user} from './fakeDB'

const app = express();

const userType = new Graphql.GraphQLObjectType({
    name: "User",
    fields: {
        name: {type: Graphql.GraphQLString},
        username: {type: Graphql.GraphQLString},
        isVacation: {type: Graphql.GraphQLBoolean}
    }
});
app.use(express.static('public'));
app.use('/graphql', graphqlHTTP({
}));
app.listen(4000);
console.log('Running a GraphQL server');
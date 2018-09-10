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

const queryType = new Graphql.GraphQLObjectType({
    name: "Query",
    fields: {
        user: {
            args: {
                id: { type: Graphql.GraphQLInt }
            },
            type: userType,
            resolve: (obj, args, context, info) => user[args.id]
        },
        allUser: {
            type: new Graphql.GraphQLList(userType),
            resolve: () => user
        }
    }
});

app.use(express.static('public'));
app.use('/graphql', graphqlHTTP({
    schema: new Graphql.GraphQLSchema({
        query: queryType
    })
}));

app.use('/graphiql', graphqlHTTP({
    schema: new Graphql.GraphQLSchema({
        query: queryType
    }),
    graphiql : true
}));

app.listen(4000);
console.log('Running a GraphQL server');
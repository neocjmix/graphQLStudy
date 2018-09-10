import express from 'express'
import graphqlHTTP from 'express-graphql'
import 'graphql'

const app = express();
app.use('/graphql', graphqlHTTP({
}));
app.listen(4000);
console.log('Running a GraphQL server');
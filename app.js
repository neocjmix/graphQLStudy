import express from 'express'
import {department, user, userDepartment} from './fakeDB'
import {ApolloServer, gql} from 'apollo-server-express'

const app = express();

const typeDefs = gql`
    type Department{
        name : String
        user : [User]
    }
    
    type User{
        id : Int
        name : String
        username : String
        isVacation : Boolean
        department(category : String) : [Department]
    }
    
    input UserInput{
        id : Int
        name : String
        username : String
        isVacation : Boolean
        department : Int
    }
    
    type Query{
        user(id: Int): User
        allUser :[User]
    }
    
    type Mutation{
        updateUser(user : UserInput!) : User
    }
`;

const resolvers = {
    Department: {
        user: (department, args, context, info) => userDepartment
            .filter(item => item.departmentId === department.id)
            .map(item => user[item.userId])
    },
    User: {
        department: (user, args, context, info) => userDepartment
            .filter(item => item.userId === user.id)
            .map(item => department[item.departmentId])
            .filter(item => args.category ? item.category === args.category : true)
    },
    Query: {
        user: (obj, args, context, info) => user[args.id],
        allUser: () => user
    },
    Mutation: {
        updateUser: (obj, args, context, info) => user[args.user.id] = {...user[args.user.id], ...args.user}
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.use(express.static('public'));
app.listen(4000);
console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);

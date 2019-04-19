const express = require('express');
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express')

const schema = makeExecutableSchema({
  typeDefs: `
    type Query {
      foo: String!
    }
  `
})

const apollo = new ApolloServer({
  schema,
  introspection: true,
  mockEntireSchema: true,
})

const app = express();

apollo.applyMiddleware({ app, path: '/graphql' })

app.listen(3000, () => {
    console.log('Express Listening to port ' + 3000);
});
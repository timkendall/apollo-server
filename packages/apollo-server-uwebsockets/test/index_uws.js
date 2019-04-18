const { App } = require('uWebSockets.js')
const { ApolloServer, makeExecutableSchema } = require('apollo-server-uwebsockets-todel')

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

const app = App({})

apollo.attachHandlers({ app })

app.listen(3000, (token) => {
  if (token) {
    console.log('uWebSockets Listening to port ' + 3000);
  } else {
    console.log('Failed to listen to port ' + 3000);
  }
});
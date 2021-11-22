const { ApolloServer, gql } = require('apollo-server')
const service = require('./student.service')

const typeDefs = gql`

  type User {
    id: ID!
    nome: String
    curso: String
    cidade: String
    cpf: String
    ra: Int
    semestre: Int
  }

  input UserCreationInput {
    nome: String!
    curso: String!
    cidade: String!
    cpf: String!
    ra: Int!
    semestre: Int!
  }

  input UserUpdateInput {
    nome: String
    curso: String
    cidade: String
    cpf: String
    ra: Int
    semestre: Int
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
  }

  type Mutation {
    createUser(data: UserCreationInput!): User!
    updateUser(id: ID!, data: UserUpdateInput!): User!
    deleteUser(id: ID!): Boolean
  }

`;

const resolvers = {
  Query: {
    users: () => service.findAll(),
    user: (_, { id }) => service.findById(id),
  },
  Mutation: {
    createUser: (_, { data }) => service.create(data),
    updateUser: (_, { id, data }) => service.updateById(id, data),
    deleteUser: (_, { id }) => service.deleteById(id)
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`✅ server running at ${url}`));

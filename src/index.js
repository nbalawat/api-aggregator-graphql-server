const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const express = require('express');
const http = require('http');
const cors = require('cors');
const { json } = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import our GraphQL schema and resolvers
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

// Import our data sources
const { 
  ProductsAPI, 
  UsersAPI, 
  OrdersAPI,
  CustomerAPI,
  PaymentAPI,
  AccountAPI
} = require('./datasources');

async function startServer() {
  // Create Express app and HTTP server
  const app = express();
  const httpServer = http.createServer(app);

  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true, // Enable introspection in all environments for demo purposes
  });

  // Start the Apollo Server
  await server.start();

  // Apply middleware
  app.use(
    '/graphql',
    cors(),
    json(),
    expressMiddleware(server, {
      context: async () => {
        // Initialize our data sources
        const dataSources = {
          productsAPI: new ProductsAPI(),
          usersAPI: new UsersAPI(),
          ordersAPI: new OrdersAPI(),
          customerAPI: new CustomerAPI(),
          paymentAPI: new PaymentAPI(),
          accountAPI: new AccountAPI(),
        };

        return {
          dataSources,
        };
      },
    }),
  );

  // Start the server
  const PORT = process.env.PORT || 4000;
  await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});

# API Aggregation Layer with GraphQL

This project implements a GraphQL API aggregation layer that connects to multiple REST APIs, correlates the data, and provides a flexible consumption model.

## Features

- GraphQL server that acts as a middleware between clients and underlying REST APIs
- Strongly-typed schema representing the combined data model
- Resolvers that fetch and transform data from REST endpoints
- Caching and error handling for improved performance and reliability

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Configure your API endpoints by copying the example environment file:
   ```
   cp .env.example .env
   ```
4. Start the development server:
   ```
   npm run dev
   ```

### Running with Mock APIs

For testing and development, you can use the included mock API server:

1. Start the mock API server:
   ```
   npm run mock
   ```

2. In a separate terminal, start the GraphQL server:
   ```
   npm run dev
   ```

Or run both simultaneously with:
```
npm run dev:all
```

## Usage

Once the server is running, you can access the GraphQL playground at `http://localhost:4000/graphql` to explore the API and execute queries.

### Example Query

```graphql
query {
  products(limit: 5) {
    id
    name
    price
    category
  }
  user(id: "1") {
    id
    name
    email
    orders {
      id
      date
      status
      items {
        productId
        quantity
      }
    }
  }
}
```

## Project Structure

- `src/index.js` - Entry point for the application
- `src/schema/` - GraphQL schema definitions
- `src/resolvers/` - GraphQL resolvers
- `src/datasources/` - API data sources
- `src/mock-server.js` - Mock REST API server for testing

## License

MIT

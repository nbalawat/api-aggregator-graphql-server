# GraphQL API Examples

This directory contains example GraphQL queries and mutations for the API aggregation layer. These examples demonstrate how to interact with the unified API for customers, accounts, and payment transactions.

## Files

- **customer-queries.graphql**: Queries and mutations related to customer management
- **account-queries.graphql**: Queries and mutations related to account management
- **transaction-queries.graphql**: Queries and mutations related to payment transactions
- **combined-queries.graphql**: Complex queries that combine multiple entity types

## How to Use

1. Start the API server with `npm run dev:all`
2. Open the GraphQL Playground at http://localhost:4000/graphql
3. Copy and paste the queries from these example files into the playground
4. Execute the queries to see the responses

## Available Operations

### Customer Operations
- Get customer details
- List customers with filtering
- Create a new customer
- Update customer status
- Get customer accounts and transactions

### Account Operations
- Get account details
- List accounts with filtering
- Create a new account
- Update account status
- Get account transactions

### Transaction Operations
- Get transaction details
- List transactions with filtering
- Process a payment
- Get transactions by customer or account

### Combined Operations
- Dashboard view with customer, accounts, and recent transactions
- Search across multiple entity types
- Customer financial summary
- Complete customer profile with all related data

## Authentication

These examples do not include authentication. In a production environment, you would need to include appropriate authentication headers with your requests.

## Error Handling

The API includes standard GraphQL error handling. Errors will be returned in the `errors` array of the response.

## Rate Limiting

The API may include rate limiting in production. Be sure to handle rate limiting responses appropriately in your client applications.

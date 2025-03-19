const typeDefs = `
  # Product related types
  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    category: String
    inStock: Boolean
    imageUrl: String
    # Related data from other services
    reviews: [Review]
  }

  type Review {
    id: ID!
    productId: ID!
    userId: ID!
    rating: Int!
    comment: String
    date: String
    # Related data from other services
    user: User
  }

  # User related types
  type User {
    id: ID!
    name: String!
    email: String!
    phone: String
    address: Address
    # Related data from other services
    orders: [Order]
    reviews: [Review]
  }

  type Address {
    street: String!
    city: String!
    state: String!
    zipCode: String!
    country: String!
  }

  # Order related types
  type Order {
    id: ID!
    userId: ID!
    date: String!
    status: OrderStatus!
    total: Float!
    items: [OrderItem]!
    # Related data from other services
    user: User
  }

  type OrderItem {
    productId: ID!
    quantity: Int!
    price: Float!
    # Related data from other services
    product: Product
  }

  enum OrderStatus {
    PENDING
    PROCESSING
    SHIPPED
    DELIVERED
    CANCELLED
  }

  # Customer related types
  type Customer {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String
    address: Address
    dateOfBirth: String
    joinDate: String
    status: CustomerStatus!
    # Related data from other services
    accounts(limit: Int, offset: Int, type: AccountType, status: AccountStatus): [Account]
    transactions(limit: Int, offset: Int, type: TransactionType, status: TransactionStatus, startDate: String, endDate: String): [Transaction]
  }

  enum CustomerStatus {
    ACTIVE
    INACTIVE
    SUSPENDED
  }

  # Account related types
  type Account {
    id: ID!
    customerId: ID!
    accountNumber: String!
    type: AccountType!
    status: AccountStatus!
    balance: Float!
    currency: String!
    openDate: String!
    lastActivityDate: String
    # Related data from other services
    customer: Customer
    transactions(limit: Int, offset: Int, type: TransactionType, status: TransactionStatus, startDate: String, endDate: String): [Transaction]
  }

  enum AccountType {
    CHECKING
    SAVINGS
    CREDIT
    INVESTMENT
  }

  enum AccountStatus {
    ACTIVE
    INACTIVE
    CLOSED
    FROZEN
  }

  # Payment/Transaction related types
  type Transaction {
    id: ID!
    transactionId: String!
    customerId: ID!
    accountId: ID
    type: TransactionType!
    amount: Float!
    currency: String!
    status: TransactionStatus!
    date: String!
    description: String
    reference: String
    # Related data from other services
    customer: Customer
    account: Account
  }

  enum TransactionType {
    DEPOSIT
    WITHDRAWAL
    TRANSFER
    PAYMENT
    REFUND
    FEE
  }

  enum TransactionStatus {
    PENDING
    COMPLETED
    FAILED
    REVERSED
  }

  # Query type defines all available queries
  type Query {
    # Product queries
    product(id: ID!): Product
    products(
      limit: Int
      offset: Int
      category: String
      minPrice: Float
      maxPrice: Float
    ): [Product]
    
    # User queries
    user(id: ID!): User
    users(limit: Int, offset: Int): [User]
    
    # Order queries
    order(id: ID!): Order
    orders(
      userId: ID
      status: OrderStatus
      startDate: String
      endDate: String
      limit: Int
      offset: Int
    ): [Order]
    
    # Customer queries
    customer(id: ID!): Customer
    customers(
      status: CustomerStatus
      limit: Int
      offset: Int
    ): [Customer]
    
    # Account queries
    account(id: ID!): Account
    accounts(
      customerId: ID
      type: AccountType
      status: AccountStatus
      limit: Int
      offset: Int
    ): [Account]
    
    # Transaction queries
    transaction(id: ID!): Transaction
    transactions(
      customerId: ID
      accountId: ID
      type: TransactionType
      status: TransactionStatus
      startDate: String
      endDate: String
      limit: Int
      offset: Int
    ): [Transaction]
    
    # Search across multiple entities
    search(query: String!): SearchResult
  }

  # Union type for search results
  union SearchResult = Product | User | Order | Customer | Account | Transaction

  # Mutation type defines all available mutations
  type Mutation {
    # These are placeholders for actual mutations you might implement
    # They're not necessary for a read-only aggregation layer
    createOrder(userId: ID!, items: [OrderItemInput!]!): Order
    updateOrderStatus(orderId: ID!, status: OrderStatus!): Order
    createReview(productId: ID!, userId: ID!, rating: Int!, comment: String): Review
    
    # Customer mutations
    createCustomer(
      firstName: String!
      lastName: String!
      email: String!
      phone: String
      address: AddressInput
      dateOfBirth: String
    ): Customer
    
    updateCustomerStatus(customerId: ID!, status: CustomerStatus!): Customer
    
    # Account mutations
    createAccount(
      customerId: ID!
      type: AccountType!
      currency: String!
      initialDeposit: Float
    ): Account
    
    updateAccountStatus(accountId: ID!, status: AccountStatus!): Account
    
    # Transaction mutations
    processPayment(
      customerId: ID!
      accountId: ID
      amount: Float!
      currency: String!
      description: String
      reference: String
    ): Transaction
  }

  input OrderItemInput {
    productId: ID!
    quantity: Int!
  }
  
  input AddressInput {
    street: String!
    city: String!
    state: String!
    zipCode: String!
    country: String!
  }
`;

module.exports = typeDefs;

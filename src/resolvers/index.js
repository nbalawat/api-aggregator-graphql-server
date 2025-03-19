// Combine all resolvers
const productResolvers = require('./product');
const userResolvers = require('./user');
const orderResolvers = require('./order');
const searchResolvers = require('./search');
const customerResolvers = require('./customer');
const accountResolvers = require('./account');
const transactionResolvers = require('./transaction');

const resolvers = {
  Query: {
    ...productResolvers.Query,
    ...userResolvers.Query,
    ...orderResolvers.Query,
    ...searchResolvers.Query,
    ...customerResolvers.Query,
    ...accountResolvers.Query,
    ...transactionResolvers.Query,
  },
  Mutation: {
    ...productResolvers.Mutation,
    ...userResolvers.Mutation,
    ...orderResolvers.Mutation,
    ...customerResolvers.Mutation,
    ...accountResolvers.Mutation,
    ...transactionResolvers.Mutation,
  },
  Product: productResolvers.Product,
  User: userResolvers.User,
  Order: orderResolvers.Order,
  OrderItem: orderResolvers.OrderItem,
  Review: productResolvers.Review,
  Customer: customerResolvers.Customer,
  Account: accountResolvers.Account,
  Transaction: transactionResolvers.Transaction,
  SearchResult: searchResolvers.SearchResult,
};

module.exports = resolvers;

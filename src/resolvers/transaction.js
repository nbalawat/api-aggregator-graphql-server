const transactionResolvers = {
  Query: {
    transaction: async (_, { id }, { dataSources }) => {
      return dataSources.paymentAPI.getTransactionById(id);
    },
    transactions: async (_, args, { dataSources }) => {
      return dataSources.paymentAPI.getTransactions(args);
    },
  },
  Mutation: {
    processPayment: async (_, paymentData, { dataSources }) => {
      // This would call the actual API to process a payment
      return dataSources.paymentAPI.processPayment(paymentData);
    },
  },
  Transaction: {
    // Resolver for customer field in Transaction type
    customer: async (transaction, _, { dataSources }) => {
      return dataSources.customerAPI.getCustomerById(transaction.customerId);
    },
    // Resolver for account field in Transaction type
    account: async (transaction, _, { dataSources }) => {
      if (!transaction.accountId) return null;
      return dataSources.accountAPI.getAccountById(transaction.accountId);
    },
  },
};

module.exports = transactionResolvers;

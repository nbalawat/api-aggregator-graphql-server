const searchResolvers = {
  Query: {
    search: async (_, { query }, { dataSources }) => {
      // Perform searches in parallel across all data sources
      const [products, users, orders, customers, accounts, transactions] = await Promise.all([
        dataSources.productsAPI.searchProducts(query),
        dataSources.usersAPI.searchUsers(query),
        dataSources.ordersAPI.searchOrders(query),
        dataSources.customerAPI.searchCustomers(query),
        // For accounts and transactions, we might not have direct search endpoints
        // so we're returning empty arrays for now
        [], // Replace with actual search when available: dataSources.accountAPI.searchAccounts(query)
        [], // Replace with actual search when available: dataSources.paymentAPI.searchTransactions(query)
      ]);

      // Combine all results
      return [...products, ...users, ...orders, ...customers, ...accounts, ...transactions];
    },
  },
  // Union type resolver to determine the type of each search result
  SearchResult: {
    __resolveType(obj) {
      if (obj.name && obj.price) {
        return 'Product';
      }
      if (obj.email && !obj.firstName && !obj.lastName) {
        return 'User';
      }
      if (obj.status && obj.items) {
        return 'Order';
      }
      if (obj.firstName && obj.lastName) {
        return 'Customer';
      }
      if (obj.accountNumber) {
        return 'Account';
      }
      if (obj.transactionId) {
        return 'Transaction';
      }
      return null;
    },
  },
};

module.exports = searchResolvers;

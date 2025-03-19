const customerResolvers = {
  Query: {
    customer: async (_, { id }, { dataSources }) => {
      return dataSources.customerAPI.getCustomerById(id);
    },
    customers: async (_, args, { dataSources }) => {
      return dataSources.customerAPI.getCustomers(args);
    },
  },
  Mutation: {
    createCustomer: async (_, customerData, { dataSources }) => {
      // This would call the actual API to create a customer
      // For now, we'll just return a mock response
      return {
        id: "new-customer-id",
        ...customerData,
        joinDate: new Date().toISOString(),
        status: "ACTIVE"
      };
    },
    updateCustomerStatus: async (_, { customerId, status }, { dataSources }) => {
      // This would call the actual API to update a customer's status
      const customer = await dataSources.customerAPI.getCustomerById(customerId);
      if (!customer) return null;
      
      // In a real implementation, you would call an update API
      return {
        ...customer,
        status
      };
    },
  },
  Customer: {
    // Resolver for accounts field in Customer type
    accounts: async (customer, args, { dataSources }) => {
      // Pass any provided arguments to the data source
      return dataSources.accountAPI.getAccountsByCustomerId(customer.id, args);
    },
    // Resolver for transactions field in Customer type
    transactions: async (customer, args, { dataSources }) => {
      // Pass any provided arguments to the data source
      return dataSources.paymentAPI.getTransactionsByCustomerId(customer.id, args);
    },
  },
};

module.exports = customerResolvers;

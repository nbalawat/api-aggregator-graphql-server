const accountResolvers = {
  Query: {
    account: async (_, { id }, { dataSources }) => {
      return dataSources.accountAPI.getAccountById(id);
    },
    accounts: async (_, args, { dataSources }) => {
      return dataSources.accountAPI.getAccounts(args);
    },
  },
  Mutation: {
    createAccount: async (_, accountData, { dataSources }) => {
      // This would call the actual API to create an account
      // For now, we'll just return a mock response
      return {
        id: "new-account-id",
        accountNumber: `ACC-${Math.floor(Math.random() * 1000000)}`,
        ...accountData,
        status: "ACTIVE",
        balance: accountData.initialDeposit || 0,
        openDate: new Date().toISOString(),
        lastActivityDate: new Date().toISOString()
      };
    },
    updateAccountStatus: async (_, { accountId, status }, { dataSources }) => {
      // This would call the actual API to update an account's status
      const account = await dataSources.accountAPI.getAccountById(accountId);
      if (!account) return null;
      
      // In a real implementation, you would call an update API
      return {
        ...account,
        status
      };
    },
  },
  Account: {
    // Resolver for customer field in Account type
    customer: async (account, _, { dataSources }) => {
      return dataSources.customerAPI.getCustomerById(account.customerId);
    },
    // Resolver for transactions field in Account type
    transactions: async (account, args, { dataSources }) => {
      // Pass any provided arguments to the data source
      return dataSources.paymentAPI.getTransactionsByAccountId(account.id, args);
    },
  },
};

module.exports = accountResolvers;

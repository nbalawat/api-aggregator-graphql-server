const userResolvers = {
  Query: {
    user: async (_, { id }, { dataSources }) => {
      return dataSources.usersAPI.getUserById(id);
    },
    users: async (_, args, { dataSources }) => {
      return dataSources.usersAPI.getUsers(args);
    },
  },
  Mutation: {
    // No user mutations for this example
  },
  User: {
    // Resolver for orders field in User type
    orders: async (user, _, { dataSources }) => {
      return dataSources.ordersAPI.getOrdersByUserId(user.id);
    },
    // Resolver for reviews field in User type
    reviews: async (user, _, { dataSources }) => {
      return dataSources.productsAPI.getReviewsByUserId(user.id);
    },
  },
};

module.exports = userResolvers;

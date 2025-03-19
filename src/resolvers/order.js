const orderResolvers = {
  Query: {
    order: async (_, { id }, { dataSources }) => {
      return dataSources.ordersAPI.getOrderById(id);
    },
    orders: async (_, args, { dataSources }) => {
      return dataSources.ordersAPI.getOrders(args);
    },
  },
  Mutation: {
    createOrder: async (_, args, { dataSources }) => {
      return dataSources.ordersAPI.createOrder(args);
    },
    updateOrderStatus: async (_, args, { dataSources }) => {
      return dataSources.ordersAPI.updateOrderStatus(args.orderId, args.status);
    },
  },
  Order: {
    // Resolver for user field in Order type
    user: async (order, _, { dataSources }) => {
      return dataSources.usersAPI.getUserById(order.userId);
    },
  },
  OrderItem: {
    // Resolver for product field in OrderItem type
    product: async (orderItem, _, { dataSources }) => {
      return dataSources.productsAPI.getProductById(orderItem.productId);
    },
  },
};

module.exports = orderResolvers;

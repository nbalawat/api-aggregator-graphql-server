const productResolvers = {
  Query: {
    product: async (_, { id }, { dataSources }) => {
      return dataSources.productsAPI.getProductById(id);
    },
    products: async (_, args, { dataSources }) => {
      return dataSources.productsAPI.getProducts(args);
    },
  },
  Mutation: {
    createReview: async (_, args, { dataSources }) => {
      return dataSources.productsAPI.createReview(args);
    },
  },
  Product: {
    // Resolver for reviews field in Product type
    reviews: async (product, _, { dataSources }) => {
      return dataSources.productsAPI.getReviewsByProductId(product.id);
    },
  },
  Review: {
    // Resolver for user field in Review type
    user: async (review, _, { dataSources }) => {
      return dataSources.usersAPI.getUserById(review.userId);
    },
  },
};

module.exports = productResolvers;

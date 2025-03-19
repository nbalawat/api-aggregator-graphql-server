const axios = require('axios');

class ProductsAPI {
  constructor() {
    this.baseURL = process.env.PRODUCTS_API;
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        // Add any required headers, such as API keys
        // 'Authorization': `Bearer ${process.env.API_KEY}`,
      },
    });
    
    // Optional: Add response caching
    this.cache = new Map();
  }

  async getProductById(id) {
    try {
      // Check cache first
      const cacheKey = `product:${id}`;
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey);
      }
      
      const response = await this.client.get(`/products/${id}`);
      
      // Cache the result
      this.cache.set(cacheKey, response.data);
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error.message);
      return null;
    }
  }

  async getProducts({ limit = 10, offset = 0, category, minPrice, maxPrice }) {
    try {
      // Build query parameters
      const params = { limit, offset };
      if (category) params.category = category;
      if (minPrice !== undefined) params.minPrice = minPrice;
      if (maxPrice !== undefined) params.maxPrice = maxPrice;
      
      const response = await this.client.get('/products', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error.message);
      return [];
    }
  }

  async getReviewsByProductId(productId) {
    try {
      const response = await this.client.get(`/products/${productId}/reviews`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching reviews for product ${productId}:`, error.message);
      return [];
    }
  }

  async getReviewsByUserId(userId) {
    try {
      const response = await this.client.get(`/reviews`, { params: { userId } });
      return response.data;
    } catch (error) {
      console.error(`Error fetching reviews by user ${userId}:`, error.message);
      return [];
    }
  }

  async createReview({ productId, userId, rating, comment }) {
    try {
      const response = await this.client.post('/reviews', {
        productId,
        userId,
        rating,
        comment,
        date: new Date().toISOString(),
      });
      return response.data;
    } catch (error) {
      console.error('Error creating review:', error.message);
      throw new Error('Failed to create review');
    }
  }

  async searchProducts(query) {
    try {
      const response = await this.client.get('/products/search', { params: { q: query } });
      return response.data;
    } catch (error) {
      console.error(`Error searching products for "${query}":`, error.message);
      return [];
    }
  }
}

module.exports = ProductsAPI;

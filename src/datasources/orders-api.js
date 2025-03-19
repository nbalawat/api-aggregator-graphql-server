const axios = require('axios');

class OrdersAPI {
  constructor() {
    this.baseURL = process.env.ORDERS_API;
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

  async getOrderById(id) {
    try {
      // Check cache first
      const cacheKey = `order:${id}`;
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey);
      }
      
      const response = await this.client.get(`/orders/${id}`);
      
      // Cache the result
      this.cache.set(cacheKey, response.data);
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching order ${id}:`, error.message);
      return null;
    }
  }

  async getOrders({ userId, status, startDate, endDate, limit = 10, offset = 0 }) {
    try {
      // Build query parameters
      const params = { limit, offset };
      if (userId) params.userId = userId;
      if (status) params.status = status;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      
      const response = await this.client.get('/orders', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      return [];
    }
  }

  async getOrdersByUserId(userId) {
    try {
      const response = await this.client.get('/orders', { 
        params: { userId } 
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching orders for user ${userId}:`, error.message);
      return [];
    }
  }

  async createOrder({ userId, items }) {
    try {
      const response = await this.client.post('/orders', {
        userId,
        items,
        date: new Date().toISOString(),
        status: 'PENDING',
      });
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error.message);
      throw new Error('Failed to create order');
    }
  }

  async updateOrderStatus(orderId, status) {
    try {
      const response = await this.client.patch(`/orders/${orderId}`, { status });
      
      // Update cache if exists
      const cacheKey = `order:${orderId}`;
      if (this.cache.has(cacheKey)) {
        const cachedOrder = this.cache.get(cacheKey);
        this.cache.set(cacheKey, { ...cachedOrder, status });
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error updating order ${orderId} status:`, error.message);
      throw new Error('Failed to update order status');
    }
  }

  async searchOrders(query) {
    try {
      const response = await this.client.get('/orders/search', { 
        params: { q: query } 
      });
      return response.data;
    } catch (error) {
      console.error(`Error searching orders for "${query}":`, error.message);
      return [];
    }
  }
}

module.exports = OrdersAPI;

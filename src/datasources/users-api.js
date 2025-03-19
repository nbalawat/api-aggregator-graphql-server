const axios = require('axios');

class UsersAPI {
  constructor() {
    this.baseURL = process.env.USERS_API;
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

  async getUserById(id) {
    try {
      // Check cache first
      const cacheKey = `user:${id}`;
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey);
      }
      
      const response = await this.client.get(`/users/${id}`);
      
      // Cache the result
      this.cache.set(cacheKey, response.data);
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error.message);
      return null;
    }
  }

  async getUsers({ limit = 10, offset = 0 }) {
    try {
      const response = await this.client.get('/users', { 
        params: { limit, offset } 
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error.message);
      return [];
    }
  }

  async searchUsers(query) {
    try {
      const response = await this.client.get('/users/search', { 
        params: { q: query } 
      });
      return response.data;
    } catch (error) {
      console.error(`Error searching users for "${query}":`, error.message);
      return [];
    }
  }
}

module.exports = UsersAPI;

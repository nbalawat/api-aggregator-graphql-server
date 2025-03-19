const axios = require('axios');

class CustomerAPI {
  constructor() {
    this.baseURL = process.env.CUSTOMER_API || 'http://localhost:3000';
    this.client = axios.create({
      baseURL: this.baseURL
    });
  }

  async getCustomerById(id) {
    try {
      const response = await this.client.get(`/customers/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching customer ${id}:`, error.message);
      return null;
    }
  }

  async getCustomers(args = {}) {
    try {
      // Build query parameters based on args
      const params = {};
      if (args.status) params.status = args.status;
      if (args.limit) params.limit = args.limit;
      if (args.offset) params.offset = args.offset;
      
      const response = await this.client.get('/customers', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching customers:', error.message);
      return [];
    }
  }

  async createCustomer(customerData) {
    try {
      const response = await this.client.post('/customers', customerData);
      return response.data;
    } catch (error) {
      console.error('Error creating customer:', error.message);
      throw new Error(`Customer creation failed: ${error.message}`);
    }
  }

  async updateCustomerStatus(customerId, status) {
    try {
      const response = await this.client.patch(`/customers/${customerId}`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating customer ${customerId} status:`, error.message);
      throw new Error(`Customer status update failed: ${error.message}`);
    }
  }
}

module.exports = CustomerAPI;

const axios = require('axios');

class AccountAPI {
  constructor() {
    this.baseURL = process.env.ACCOUNT_API || 'http://localhost:3000';
    this.client = axios.create({
      baseURL: this.baseURL
    });
  }

  async getAccountById(id) {
    try {
      const response = await this.client.get(`/accounts/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching account ${id}:`, error.message);
      return null;
    }
  }

  async getAccounts(args = {}) {
    try {
      // Build query parameters based on args
      const params = {};
      if (args.type) params.type = args.type;
      if (args.status) params.status = args.status;
      if (args.limit) params.limit = args.limit;
      if (args.offset) params.offset = args.offset;
      
      const response = await this.client.get('/accounts', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching accounts:', error.message);
      return [];
    }
  }

  async getAccountsByCustomerId(customerId, args = {}) {
    try {
      // Build query parameters based on args
      const params = { customerId };
      if (args.type) params.type = args.type;
      if (args.status) params.status = args.status;
      if (args.limit) params.limit = args.limit;
      if (args.offset) params.offset = args.offset;
      
      const response = await this.client.get('/accounts', { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching accounts for customer ${customerId}:`, error.message);
      return [];
    }
  }

  async createAccount(accountData) {
    try {
      const response = await this.client.post('/accounts', accountData);
      return response.data;
    } catch (error) {
      console.error('Error creating account:', error.message);
      throw new Error(`Account creation failed: ${error.message}`);
    }
  }

  async updateAccountStatus(accountId, status) {
    try {
      const response = await this.client.patch(`/accounts/${accountId}`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating account ${accountId} status:`, error.message);
      throw new Error(`Account status update failed: ${error.message}`);
    }
  }
}

module.exports = AccountAPI;

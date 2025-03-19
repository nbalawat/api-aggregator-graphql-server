const axios = require('axios');

class PaymentAPI {
  constructor() {
    this.baseURL = process.env.PAYMENT_API || 'http://localhost:3000';
    this.client = axios.create({
      baseURL: this.baseURL
    });
  }

  async getTransactionById(id) {
    try {
      const response = await this.client.get(`/transactions/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching transaction ${id}:`, error.message);
      return null;
    }
  }

  async getTransactions(args = {}) {
    try {
      // Build query parameters based on args
      const params = {};
      if (args.customerId) params.customerId = args.customerId;
      if (args.accountId) params.accountId = args.accountId;
      if (args.type) params.type = args.type;
      if (args.status) params.status = args.status;
      if (args.startDate) params.startDate = args.startDate;
      if (args.endDate) params.endDate = args.endDate;
      if (args.limit) params.limit = args.limit;
      if (args.offset) params.offset = args.offset;
      
      const response = await this.client.get('/transactions', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions:', error.message);
      return [];
    }
  }

  async getTransactionsByCustomerId(customerId, args = {}) {
    // Add customerId to the args and call getTransactions
    return this.getTransactions({ ...args, customerId });
  }

  async getTransactionsByAccountId(accountId, args = {}) {
    // Add accountId to the args and call getTransactions
    return this.getTransactions({ ...args, accountId });
  }

  async processPayment(paymentData) {
    try {
      const response = await this.client.post('/transactions', paymentData);
      return response.data;
    } catch (error) {
      console.error('Error processing payment:', error.message);
      throw new Error(`Payment processing failed: ${error.message}`);
    }
  }
}

module.exports = PaymentAPI;

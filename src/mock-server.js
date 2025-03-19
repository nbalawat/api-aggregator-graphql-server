const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Sample data
const products = [
  { id: '1', name: 'Laptop', description: 'High-performance laptop', price: 1299.99, category: 'Electronics', inStock: true, imageUrl: 'https://example.com/laptop.jpg' },
  { id: '2', name: 'Smartphone', description: 'Latest smartphone', price: 899.99, category: 'Electronics', inStock: true, imageUrl: 'https://example.com/smartphone.jpg' },
  { id: '3', name: 'Headphones', description: 'Noise-cancelling headphones', price: 249.99, category: 'Electronics', inStock: false, imageUrl: 'https://example.com/headphones.jpg' },
];

const reviews = [
  { id: '1', productId: '1', userId: '1', rating: 5, comment: 'Great laptop!', date: '2025-01-15T10:30:00Z' },
  { id: '2', productId: '1', userId: '2', rating: 4, comment: 'Good performance', date: '2025-01-20T14:15:00Z' },
  { id: '3', productId: '2', userId: '1', rating: 5, comment: 'Excellent phone', date: '2025-02-10T09:45:00Z' },
];

const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', address: { street: '123 Main St', city: 'New York', state: 'NY', zipCode: '10001', country: 'USA' } },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210', address: { street: '456 Oak Ave', city: 'San Francisco', state: 'CA', zipCode: '94102', country: 'USA' } },
];

const orders = [
  { 
    id: '1', 
    userId: '1', 
    date: '2025-02-20T15:30:00Z', 
    status: 'DELIVERED', 
    total: 1299.99,
    items: [
      { productId: '1', quantity: 1, price: 1299.99 }
    ]
  },
  { 
    id: '2', 
    userId: '1', 
    date: '2025-03-05T11:20:00Z', 
    status: 'SHIPPED', 
    total: 1149.98,
    items: [
      { productId: '2', quantity: 1, price: 899.99 },
      { productId: '3', quantity: 1, price: 249.99 }
    ]
  },
  { 
    id: '3', 
    userId: '2', 
    date: '2025-03-10T09:15:00Z', 
    status: 'PROCESSING', 
    total: 899.99,
    items: [
      { productId: '2', quantity: 1, price: 899.99 }
    ]
  },
];

// New sample data for our additional APIs
const customers = [
  { 
    id: '1', 
    firstName: 'Michael', 
    lastName: 'Johnson', 
    email: 'michael@example.com', 
    phone: '555-123-4567', 
    address: { 
      street: '789 Pine St', 
      city: 'Chicago', 
      state: 'IL', 
      zipCode: '60601', 
      country: 'USA' 
    },
    dateOfBirth: '1985-07-15',
    joinDate: '2023-01-10T08:30:00Z',
    status: 'ACTIVE'
  },
  { 
    id: '2', 
    firstName: 'Sarah', 
    lastName: 'Williams', 
    email: 'sarah@example.com', 
    phone: '555-987-6543', 
    address: { 
      street: '321 Maple Ave', 
      city: 'Boston', 
      state: 'MA', 
      zipCode: '02108', 
      country: 'USA' 
    },
    dateOfBirth: '1990-03-22',
    joinDate: '2023-02-15T10:45:00Z',
    status: 'ACTIVE'
  },
  { 
    id: '3', 
    firstName: 'David', 
    lastName: 'Brown', 
    email: 'david@example.com', 
    phone: '555-456-7890', 
    address: { 
      street: '567 Oak Ln', 
      city: 'Austin', 
      state: 'TX', 
      zipCode: '73301', 
      country: 'USA' 
    },
    dateOfBirth: '1978-11-30',
    joinDate: '2023-03-05T14:20:00Z',
    status: 'INACTIVE'
  }
];

const accounts = [
  {
    id: '1',
    customerId: '1',
    accountNumber: 'ACC-123456',
    type: 'CHECKING',
    status: 'ACTIVE',
    balance: 5250.75,
    currency: 'USD',
    openDate: '2023-01-15T09:30:00Z',
    lastActivityDate: '2025-03-18T16:45:00Z'
  },
  {
    id: '2',
    customerId: '1',
    accountNumber: 'ACC-789012',
    type: 'SAVINGS',
    status: 'ACTIVE',
    balance: 12500.50,
    currency: 'USD',
    openDate: '2023-01-20T11:15:00Z',
    lastActivityDate: '2025-03-10T13:20:00Z'
  },
  {
    id: '3',
    customerId: '2',
    accountNumber: 'ACC-345678',
    type: 'CHECKING',
    status: 'ACTIVE',
    balance: 3750.25,
    currency: 'USD',
    openDate: '2023-02-18T10:00:00Z',
    lastActivityDate: '2025-03-15T09:10:00Z'
  },
  {
    id: '4',
    customerId: '3',
    accountNumber: 'ACC-901234',
    type: 'CREDIT',
    status: 'FROZEN',
    balance: -1250.00,
    currency: 'USD',
    openDate: '2023-03-10T14:30:00Z',
    lastActivityDate: '2025-03-01T17:45:00Z'
  }
];

const transactions = [
  {
    id: '1',
    transactionId: 'TXN-123456789',
    customerId: '1',
    accountId: '1',
    type: 'DEPOSIT',
    amount: 1000.00,
    currency: 'USD',
    status: 'COMPLETED',
    date: '2025-03-01T10:30:00Z',
    description: 'Salary deposit',
    reference: 'REF-001'
  },
  {
    id: '2',
    transactionId: 'TXN-987654321',
    customerId: '1',
    accountId: '1',
    type: 'WITHDRAWAL',
    amount: 250.00,
    currency: 'USD',
    status: 'COMPLETED',
    date: '2025-03-05T15:45:00Z',
    description: 'ATM withdrawal',
    reference: 'REF-002'
  },
  {
    id: '3',
    transactionId: 'TXN-456789123',
    customerId: '1',
    accountId: '2',
    type: 'TRANSFER',
    amount: 500.00,
    currency: 'USD',
    status: 'COMPLETED',
    date: '2025-03-10T09:15:00Z',
    description: 'Transfer to savings',
    reference: 'REF-003'
  },
  {
    id: '4',
    transactionId: 'TXN-789123456',
    customerId: '2',
    accountId: '3',
    type: 'PAYMENT',
    amount: 75.50,
    currency: 'USD',
    status: 'COMPLETED',
    date: '2025-03-12T14:20:00Z',
    description: 'Utility bill payment',
    reference: 'REF-004'
  },
  {
    id: '5',
    transactionId: 'TXN-321654987',
    customerId: '3',
    accountId: '4',
    type: 'PAYMENT',
    amount: 120.75,
    currency: 'USD',
    status: 'FAILED',
    date: '2025-03-15T11:30:00Z',
    description: 'Online purchase',
    reference: 'REF-005'
  }
];

// Product endpoints
app.get('/products', (req, res) => {
  const { limit = 10, offset = 0, category, minPrice, maxPrice } = req.query;
  
  let filteredProducts = [...products];
  
  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }
  
  if (minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
  }
  
  if (maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
  }
  
  const paginatedProducts = filteredProducts.slice(parseInt(offset), parseInt(offset) + parseInt(limit));
  
  res.json(paginatedProducts);
});

app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(product);
});

app.get('/products/:id/reviews', (req, res) => {
  const productReviews = reviews.filter(r => r.productId === req.params.id);
  res.json(productReviews);
});

app.get('/products/search', (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.json([]);
  }
  
  const searchResults = products.filter(p => 
    p.name.toLowerCase().includes(q.toLowerCase()) || 
    (p.description && p.description.toLowerCase().includes(q.toLowerCase()))
  );
  
  res.json(searchResults);
});

// Review endpoints
app.get('/reviews', (req, res) => {
  const { userId } = req.query;
  
  if (userId) {
    const userReviews = reviews.filter(r => r.userId === userId);
    return res.json(userReviews);
  }
  
  res.json(reviews);
});

app.post('/reviews', (req, res) => {
  const { productId, userId, rating, comment } = req.body;
  
  if (!productId || !userId || !rating) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const newReview = {
    id: (reviews.length + 1).toString(),
    productId,
    userId,
    rating,
    comment,
    date: new Date().toISOString()
  };
  
  reviews.push(newReview);
  
  res.status(201).json(newReview);
});

// User endpoints
app.get('/users', (req, res) => {
  const { limit = 10, offset = 0 } = req.query;
  
  const paginatedUsers = users.slice(parseInt(offset), parseInt(offset) + parseInt(limit));
  
  res.json(paginatedUsers);
});

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(user);
});

app.get('/users/search', (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.json([]);
  }
  
  const searchResults = users.filter(u => 
    u.name.toLowerCase().includes(q.toLowerCase()) || 
    u.email.toLowerCase().includes(q.toLowerCase())
  );
  
  res.json(searchResults);
});

// Order endpoints
app.get('/orders', (req, res) => {
  const { userId, status, startDate, endDate, limit = 10, offset = 0 } = req.query;
  
  let filteredOrders = [...orders];
  
  if (userId) {
    filteredOrders = filteredOrders.filter(o => o.userId === userId);
  }
  
  if (status) {
    filteredOrders = filteredOrders.filter(o => o.status === status);
  }
  
  if (startDate) {
    const start = new Date(startDate);
    filteredOrders = filteredOrders.filter(o => new Date(o.date) >= start);
  }
  
  if (endDate) {
    const end = new Date(endDate);
    filteredOrders = filteredOrders.filter(o => new Date(o.date) <= end);
  }
  
  const paginatedOrders = filteredOrders.slice(parseInt(offset), parseInt(offset) + parseInt(limit));
  
  res.json(paginatedOrders);
});

app.get('/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  res.json(order);
});

app.post('/orders', (req, res) => {
  const { userId, items } = req.body;
  
  if (!userId || !items || !items.length) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Calculate total
  let total = 0;
  for (const item of items) {
    const product = products.find(p => p.id === item.productId);
    if (product) {
      total += product.price * item.quantity;
    }
  }
  
  const newOrder = {
    id: (orders.length + 1).toString(),
    userId,
    date: new Date().toISOString(),
    status: 'PENDING',
    total,
    items: items.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product ? product.price : 0
      };
    })
  };
  
  orders.push(newOrder);
  
  res.status(201).json(newOrder);
});

app.patch('/orders/:id', (req, res) => {
  const { status } = req.body;
  const order = orders.find(o => o.id === req.params.id);
  
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }
  
  order.status = status;
  
  res.json(order);
});

app.get('/orders/search', (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.json([]);
  }
  
  // For simplicity, just search by ID
  const searchResults = orders.filter(o => o.id.includes(q));
  
  res.json(searchResults);
});

// Customer endpoints
app.get('/customers', (req, res) => {
  const { status, limit = 10, offset = 0 } = req.query;
  
  let filteredCustomers = [...customers];
  
  if (status) {
    filteredCustomers = filteredCustomers.filter(c => c.status === status);
  }
  
  const paginatedCustomers = filteredCustomers.slice(parseInt(offset), parseInt(offset) + parseInt(limit));
  
  res.json(paginatedCustomers);
});

app.get('/customers/:id', (req, res) => {
  const customer = customers.find(c => c.id === req.params.id);
  
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  
  res.json(customer);
});

app.post('/customers', (req, res) => {
  const { firstName, lastName, email, phone, address, dateOfBirth } = req.body;
  
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const newCustomer = {
    id: (customers.length + 1).toString(),
    firstName,
    lastName,
    email,
    phone,
    address,
    dateOfBirth,
    joinDate: new Date().toISOString(),
    status: 'ACTIVE'
  };
  
  customers.push(newCustomer);
  
  res.status(201).json(newCustomer);
});

app.patch('/customers/:id', (req, res) => {
  const { status } = req.body;
  const customer = customers.find(c => c.id === req.params.id);
  
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  
  if (status) {
    customer.status = status;
  }
  
  res.json(customer);
});

app.get('/customers/search', (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.json([]);
  }
  
  const searchResults = customers.filter(c => 
    c.firstName.toLowerCase().includes(q.toLowerCase()) || 
    c.lastName.toLowerCase().includes(q.toLowerCase()) || 
    c.email.toLowerCase().includes(q.toLowerCase())
  );
  
  res.json(searchResults);
});

// Account endpoints
app.get('/accounts', (req, res) => {
  const { customerId, type, status, limit = 10, offset = 0 } = req.query;
  
  let filteredAccounts = [...accounts];
  
  if (customerId) {
    filteredAccounts = filteredAccounts.filter(a => a.customerId === customerId);
  }
  
  if (type) {
    filteredAccounts = filteredAccounts.filter(a => a.type === type);
  }
  
  if (status) {
    filteredAccounts = filteredAccounts.filter(a => a.status === status);
  }
  
  const paginatedAccounts = filteredAccounts.slice(parseInt(offset), parseInt(offset) + parseInt(limit));
  
  res.json(paginatedAccounts);
});

app.get('/accounts/:id', (req, res) => {
  const account = accounts.find(a => a.id === req.params.id);
  
  if (!account) {
    return res.status(404).json({ error: 'Account not found' });
  }
  
  res.json(account);
});

app.get('/accounts/:id/balance', (req, res) => {
  const account = accounts.find(a => a.id === req.params.id);
  
  if (!account) {
    return res.status(404).json({ error: 'Account not found' });
  }
  
  res.json({ balance: account.balance, currency: account.currency });
});

app.post('/accounts', (req, res) => {
  const { customerId, type, currency, initialDeposit = 0 } = req.body;
  
  if (!customerId || !type || !currency) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Check if customer exists
  const customer = customers.find(c => c.id === customerId);
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  
  const newAccount = {
    id: (accounts.length + 1).toString(),
    customerId,
    accountNumber: `ACC-${Math.floor(Math.random() * 1000000)}`,
    type,
    status: 'ACTIVE',
    balance: initialDeposit,
    currency,
    openDate: new Date().toISOString(),
    lastActivityDate: new Date().toISOString()
  };
  
  accounts.push(newAccount);
  
  res.status(201).json(newAccount);
});

app.patch('/accounts/:id', (req, res) => {
  const { status } = req.body;
  const account = accounts.find(a => a.id === req.params.id);
  
  if (!account) {
    return res.status(404).json({ error: 'Account not found' });
  }
  
  if (status) {
    account.status = status;
  }
  
  res.json(account);
});

// Transaction endpoints
app.get('/transactions', (req, res) => {
  const { customerId, accountId, type, status, startDate, endDate, limit = 10, offset = 0 } = req.query;
  
  let filteredTransactions = [...transactions];
  
  if (customerId) {
    filteredTransactions = filteredTransactions.filter(t => t.customerId === customerId);
  }
  
  if (accountId) {
    filteredTransactions = filteredTransactions.filter(t => t.accountId === accountId);
  }
  
  if (type) {
    filteredTransactions = filteredTransactions.filter(t => t.type === type);
  }
  
  if (status) {
    filteredTransactions = filteredTransactions.filter(t => t.status === status);
  }
  
  if (startDate) {
    const start = new Date(startDate);
    filteredTransactions = filteredTransactions.filter(t => new Date(t.date) >= start);
  }
  
  if (endDate) {
    const end = new Date(endDate);
    filteredTransactions = filteredTransactions.filter(t => new Date(t.date) <= end);
  }
  
  const paginatedTransactions = filteredTransactions.slice(parseInt(offset), parseInt(offset) + parseInt(limit));
  
  res.json(paginatedTransactions);
});

app.get('/transactions/:id', (req, res) => {
  const transaction = transactions.find(t => t.id === req.params.id);
  
  if (!transaction) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
  
  res.json(transaction);
});

app.post('/transactions', (req, res) => {
  const { customerId, accountId, amount, currency, description, reference } = req.body;
  
  if (!customerId || !amount || !currency) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Check if customer exists
  const customer = customers.find(c => c.id === customerId);
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  
  // If accountId is provided, check if account exists and belongs to the customer
  if (accountId) {
    const account = accounts.find(a => a.id === accountId);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    if (account.customerId !== customerId) {
      return res.status(403).json({ error: 'Account does not belong to this customer' });
    }
    
    // Update account balance
    account.balance += amount;
    account.lastActivityDate = new Date().toISOString();
  }
  
  const newTransaction = {
    id: (transactions.length + 1).toString(),
    transactionId: `TXN-${Math.floor(Math.random() * 1000000000)}`,
    customerId,
    accountId,
    type: amount > 0 ? 'DEPOSIT' : 'PAYMENT',
    amount: Math.abs(amount),
    currency,
    status: 'COMPLETED',
    date: new Date().toISOString(),
    description: description || (amount > 0 ? 'Deposit' : 'Payment'),
    reference: reference || `REF-${Math.floor(Math.random() * 1000000)}`
  };
  
  transactions.push(newTransaction);
  
  res.status(201).json(newTransaction);
});

// Start server
app.listen(PORT, () => {
  console.log(`Mock API server running at http://localhost:${PORT}`);
});

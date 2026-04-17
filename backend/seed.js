require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Customer = require('./models/Customer');
const Supplier = require('./models/Supplier');
const Product = require('./models/Product');
const Employee = require('./models/Employee');
const PurchaseOrder = require('./models/PurchaseOrder');
const SalesOrder = require('./models/SalesOrder');
const JournalEntry = require('./models/JournalEntry');
const connectDB = require('./config/db');

const seed = async () => {
  await connectDB();

  // Seed Admin User
  const adminExists = await User.findOne({ email: 'admin@erp.com' });
  if (!adminExists) {
    await User.create({ name: 'Admin', email: 'admin@erp.com', password: 'Admin@123', role: 'admin' });
    console.log('Admin user created');
  } else {
    console.log('Admin already exists');
  }

  // Seed Suppliers
  const suppliers = [
    { name: 'Tech Supplies Inc.', email: 'contact@techsupplies.com', phone: '123-456-7890', address: { street: '123 Tech St', city: 'Tech City', state: 'CA', zip: '90210' } },
    { name: 'Office Essentials Ltd.', email: 'info@officeessentials.com', phone: '987-654-3210', address: { street: '456 Office Ave', city: 'Business Town', state: 'NY', zip: '10001' } },
    { name: 'Global Electronics', email: 'sales@globalelec.com', phone: '555-123-4567', address: { street: '789 Elec Blvd', city: 'Silicon Valley', state: 'CA', zip: '94043' } },
    { name: 'Furniture World', email: 'orders@furnitureworld.com', phone: '444-567-8901', address: { street: '321 Furn St', city: 'Wood City', state: 'WA', zip: '98101' } }
  ];
  for (const supplier of suppliers) {
    const exists = await Supplier.findOne({ email: supplier.email });
    if (!exists) {
      await Supplier.create(supplier);
      console.log(`Supplier ${supplier.name} created`);
    }
  }

  // Seed Customers
  const customers = [
    { name: 'John Doe', email: 'john@example.com', phone: '555-1234', company: 'Doe Corp', address: { street: '789 Customer Rd', city: 'Client City', state: 'TX', zip: '75001' }, creditLimit: 5000 },
    { name: 'Jane Smith', email: 'jane@example.com', phone: '555-5678', company: 'Smith LLC', address: { street: '321 Client St', city: 'Buyer Town', state: 'FL', zip: '33101' }, creditLimit: 10000 },
    { name: 'Mike Johnson', email: 'mike@startup.com', phone: '555-9012', company: 'Tech Startup Inc.', address: { street: '654 Innovate Ave', city: 'Innovation City', state: 'CA', zip: '94105' }, creditLimit: 7500 },
    { name: 'Sarah Wilson', email: 'sarah@retail.com', phone: '555-3456', company: 'Retail Chain Ltd.', address: { street: '987 Shop St', city: 'Retail Town', state: 'NY', zip: '10002' }, creditLimit: 15000 }
  ];
  for (const customer of customers) {
    const exists = await Customer.findOne({ email: customer.email });
    if (!exists) {
      await Customer.create(customer);
      console.log(`Customer ${customer.name} created`);
    }
  }

  // Get suppliers for products
  const supplier1 = await Supplier.findOne({ email: 'contact@techsupplies.com' });
  const supplier2 = await Supplier.findOne({ email: 'info@officeessentials.com' });
  const supplier3 = await Supplier.findOne({ email: 'sales@globalelec.com' });
  const supplier4 = await Supplier.findOne({ email: 'orders@furnitureworld.com' });

  // Seed Products
  const products = [
    { name: 'Laptop', sku: 'LAP001', description: 'High-performance laptop', category: 'Electronics', costPrice: 800, sellingPrice: 1200, quantity: 50, reorderLevel: 10, supplier: supplier1._id },
    { name: 'Office Chair', sku: 'CHR001', description: 'Ergonomic office chair', category: 'Furniture', costPrice: 150, sellingPrice: 250, quantity: 30, reorderLevel: 5, supplier: supplier2._id },
    { name: 'Printer', sku: 'PRT001', description: 'Color laser printer', category: 'Electronics', costPrice: 300, sellingPrice: 450, quantity: 20, reorderLevel: 5, supplier: supplier1._id },
    { name: 'Monitor', sku: 'MON001', description: '27-inch 4K monitor', category: 'Electronics', costPrice: 400, sellingPrice: 600, quantity: 25, reorderLevel: 8, supplier: supplier1._id },
    { name: 'Desk', sku: 'DSK001', description: 'Adjustable standing desk', category: 'Furniture', costPrice: 200, sellingPrice: 350, quantity: 15, reorderLevel: 3, supplier: supplier2._id },
    { name: 'Keyboard', sku: 'KBD001', description: 'Mechanical keyboard', category: 'Electronics', costPrice: 80, sellingPrice: 120, quantity: 40, reorderLevel: 10, supplier: supplier1._id },
    { name: 'Mouse', sku: 'MSE001', description: 'Wireless optical mouse', category: 'Electronics', costPrice: 20, sellingPrice: 35, quantity: 60, reorderLevel: 15, supplier: supplier1._id },
    { name: 'Headphones', sku: 'HPH001', description: 'Noise-cancelling headphones', category: 'Electronics', costPrice: 150, sellingPrice: 250, quantity: 35, reorderLevel: 7, supplier: supplier3._id },
    { name: 'Bookshelf', sku: 'BSH001', description: 'Wooden bookshelf', category: 'Furniture', costPrice: 100, sellingPrice: 180, quantity: 20, reorderLevel: 4, supplier: supplier4._id },
    { name: 'Tablet', sku: 'TAB001', description: '10-inch tablet', category: 'Electronics', costPrice: 300, sellingPrice: 450, quantity: 30, reorderLevel: 6, supplier: supplier3._id }
  ];
  for (const product of products) {
    const exists = await Product.findOne({ sku: product.sku });
    if (!exists) {
      await Product.create(product);
      console.log(`Product ${product.name} created`);
    }
  }

  // Seed Employees
  const employees = [
    { employeeId: 'EMP001', firstName: 'Alice', lastName: 'Johnson', email: 'alice@erp.com', phone: '555-1111', department: 'Sales', position: 'Manager', hireDate: new Date('2023-01-15'), salary: 60000 },
    { employeeId: 'EMP002', firstName: 'Bob', lastName: 'Wilson', email: 'bob@erp.com', phone: '555-2222', department: 'IT', position: 'Developer', hireDate: new Date('2023-02-01'), salary: 70000 },
    { employeeId: 'EMP003', firstName: 'Carol', lastName: 'Davis', email: 'carol@erp.com', phone: '555-3333', department: 'HR', position: 'Specialist', hireDate: new Date('2023-03-10'), salary: 55000 },
    { employeeId: 'EMP004', firstName: 'David', lastName: 'Brown', email: 'david@erp.com', phone: '555-4444', department: 'Finance', position: 'Accountant', hireDate: new Date('2023-04-05'), salary: 65000 },
    { employeeId: 'EMP005', firstName: 'Eva', lastName: 'Miller', email: 'eva@erp.com', phone: '555-5555', department: 'Operations', position: 'Coordinator', hireDate: new Date('2023-05-20'), salary: 50000 }
  ];
  for (const employee of employees) {
    const exists = await Employee.findOne({ email: employee.email });
    if (!exists) {
      await Employee.create(employee);
      console.log(`Employee ${employee.firstName} ${employee.lastName} created`);
    }
  }

  // Get products for orders
  const laptop = await Product.findOne({ sku: 'LAP001' });
  const chair = await Product.findOne({ sku: 'CHR001' });
  const printer = await Product.findOne({ sku: 'PRT001' });
  const monitor = await Product.findOne({ sku: 'MON001' });
  const desk = await Product.findOne({ sku: 'DSK001' });

  // Seed Purchase Orders
  const purchaseOrders = [
    {
      orderNumber: 'PO001',
      supplier: supplier1._id,
      items: [
        { product: laptop._id, quantity: 10, unitCost: 800, total: 8000 },
        { product: printer._id, quantity: 5, unitCost: 300, total: 1500 }
      ],
      subtotal: 9500,
      taxAmount: 950,
      total: 10450,
      status: 'received',
      expectedDate: new Date('2024-01-15'),
      notes: 'Urgent order for new laptops'
    },
    {
      orderNumber: 'PO002',
      supplier: supplier2._id,
      items: [
        { product: chair._id, quantity: 20, unitCost: 150, total: 3000 },
        { product: desk._id, quantity: 10, unitCost: 200, total: 2000 }
      ],
      subtotal: 5000,
      taxAmount: 500,
      total: 5500,
      status: 'confirmed',
      expectedDate: new Date('2024-02-01'),
      notes: 'Office furniture restock'
    }
  ];
  for (const po of purchaseOrders) {
    const exists = await PurchaseOrder.findOne({ orderNumber: po.orderNumber });
    if (!exists) {
      await PurchaseOrder.create(po);
      console.log(`Purchase Order ${po.orderNumber} created`);
    }
  }

  // Get customers for sales orders
  const customer1 = await Customer.findOne({ email: 'john@example.com' });
  const customer2 = await Customer.findOne({ email: 'jane@example.com' });
  const customer3 = await Customer.findOne({ email: 'mike@startup.com' });

  // Seed Sales Orders
  const salesOrders = [
    {
      orderNumber: 'SO001',
      customer: customer1._id,
      items: [
        { product: laptop._id, quantity: 2, unitPrice: 1200, discount: 0, tax: 240, total: 2400 },
        { product: monitor._id, quantity: 1, unitPrice: 600, discount: 0, tax: 60, total: 600 }
      ],
      subtotal: 3000,
      taxAmount: 300,
      discountAmount: 0,
      total: 3300,
      status: 'delivered',
      paymentStatus: 'paid',
      notes: 'First order from Doe Corp'
    },
    {
      orderNumber: 'SO002',
      customer: customer2._id,
      items: [
        { product: chair._id, quantity: 5, unitPrice: 250, discount: 50, tax: 100, total: 1200 },
        { product: desk._id, quantity: 2, unitPrice: 350, discount: 0, tax: 70, total: 700 }
      ],
      subtotal: 1900,
      taxAmount: 170,
      discountAmount: 50,
      total: 2020,
      status: 'shipped',
      paymentStatus: 'partial',
      notes: 'Bulk furniture order'
    },
    {
      orderNumber: 'SO003',
      customer: customer3._id,
      items: [
        { product: printer._id, quantity: 3, unitPrice: 450, discount: 0, tax: 135, total: 1350 },
        { product: laptop._id, quantity: 1, unitPrice: 1200, discount: 120, tax: 108, total: 1188 }
      ],
      subtotal: 2538,
      taxAmount: 243,
      discountAmount: 120,
      total: 2661,
      status: 'processing',
      paymentStatus: 'unpaid',
      notes: 'Startup equipment'
    }
  ];
  for (const so of salesOrders) {
    const exists = await SalesOrder.findOne({ orderNumber: so.orderNumber });
    if (!exists) {
      await SalesOrder.create(so);
      console.log(`Sales Order ${so.orderNumber} created`);
    }
  }

  // Seed Journal Entries
  const journalEntries = [
    {
      entryNumber: 'JE001',
      date: new Date('2024-01-01'),
      lines: [
        { account: 'Cash', description: 'Initial cash deposit', debit: 10000, credit: 0 },
        { account: 'Capital', description: 'Owner investment', debit: 0, credit: 10000 }
      ],
      reference: 'Startup funding',
      notes: 'Company startup',
      status: 'posted'
    },
    {
      entryNumber: 'JE002',
      date: new Date('2024-01-15'),
      lines: [
        { account: 'Accounts Receivable', description: 'Sale to customer', debit: 3300, credit: 0 },
        { account: 'Sales Revenue', description: 'Product sales', debit: 0, credit: 3300 }
      ],
      reference: 'SO001',
      notes: 'Sales order SO001',
      status: 'posted'
    },
    {
      entryNumber: 'JE003',
      date: new Date('2024-01-20'),
      lines: [
        { account: 'Inventory', description: 'Purchase of goods', debit: 10450, credit: 0 },
        { account: 'Accounts Payable', description: 'Purchase from supplier', debit: 0, credit: 10450 }
      ],
      reference: 'PO001',
      notes: 'Purchase order PO001',
      status: 'posted'
    }
  ];
  for (const je of journalEntries) {
    const exists = await JournalEntry.findOne({ entryNumber: je.entryNumber });
    if (!exists) {
      await JournalEntry.create(je);
      console.log(`Journal Entry ${je.entryNumber} created`);
    }
  }

  console.log('Seeding completed');
  process.exit();
};

seed();

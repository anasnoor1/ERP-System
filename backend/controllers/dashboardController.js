const SalesOrder = require('../models/SalesOrder');
const PurchaseOrder = require('../models/PurchaseOrder');
const Product = require('../models/Product');
const Customer = require('../models/Customer');
const Employee = require('../models/Employee');

exports.getStats = async (req, res) => {
  try {
    const [totalSales, totalPurchases, totalProducts, totalCustomers, totalEmployees, lowStock] = await Promise.all([
      SalesOrder.aggregate([{ $match: { status: { $ne: 'cancelled' } } }, { $group: { _id: null, total: { $sum: '$total' }, count: { $sum: 1 } } }]),
      PurchaseOrder.aggregate([{ $match: { status: { $ne: 'cancelled' } } }, { $group: { _id: null, total: { $sum: '$total' }, count: { $sum: 1 } } }]),
      Product.countDocuments({ isActive: true }),
      Customer.countDocuments({ isActive: true }),
      Employee.countDocuments({ status: 'active' }),
      Product.countDocuments({ $expr: { $lte: ['$quantity', '$reorderLevel'] } }),
    ]);

    const recentSales = await SalesOrder.find().sort('-createdAt').limit(5).populate('customer', 'name');
    const recentPurchases = await PurchaseOrder.find().sort('-createdAt').limit(5).populate('supplier', 'name');

    // Monthly sales data
    const monthlySales = await SalesOrder.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } }, total: { $sum: '$total' }, count: { $sum: 1 } } },
      { $sort: { '_id': 1 } }
    ]);

    // Top selling products
    const topProducts = await SalesOrder.aggregate([
      { $unwind: '$items' },
      { $group: { _id: '$items.product', totalSold: { $sum: '$items.quantity' }, totalRevenue: { $sum: '$items.total' } } },
      { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'product' } },
      { $unwind: '$product' },
      { $project: { name: '$product.name', totalSold: 1, totalRevenue: 1 } },
      { $sort: { totalRevenue: -1 } },
      { $limit: 5 }
    ]);

    // Inventory levels
    const inventoryData = await Product.find({ isActive: true }).select('name quantity reorderLevel').sort('quantity');

    res.json({
      revenue: totalSales[0]?.total || 0,
      salesCount: totalSales[0]?.count || 0,
      expenses: totalPurchases[0]?.total || 0,
      purchaseCount: totalPurchases[0]?.count || 0,
      totalProducts, totalCustomers, totalEmployees, lowStock,
      recentSales, recentPurchases,
      monthlySales,
      topProducts,
      inventoryData,
    });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

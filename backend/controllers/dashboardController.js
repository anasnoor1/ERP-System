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

    res.json({
      revenue: totalSales[0]?.total || 0,
      salesCount: totalSales[0]?.count || 0,
      expenses: totalPurchases[0]?.total || 0,
      purchaseCount: totalPurchases[0]?.count || 0,
      totalProducts, totalCustomers, totalEmployees, lowStock,
      recentSales, recentPurchases,
    });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

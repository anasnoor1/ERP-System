const SalesOrder = require('../models/SalesOrder');
const Product = require('../models/Product');

const generateOrderNumber = async () => {
  const count = await SalesOrder.countDocuments();
  return `SO-${String(count + 1).padStart(6, '0')}`;
};

exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const query = status ? { status } : {};
    const data = await SalesOrder.find(query).sort('-createdAt').limit(+limit).skip((+page - 1) * +limit)
      .populate('customer', 'name email').populate('items.product', 'name sku');
    const total = await SalesOrder.countDocuments(query);
    res.json({ data, total, page: +page, pages: Math.ceil(total / +limit) });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getById = async (req, res) => {
  try {
    const doc = await SalesOrder.findById(req.params.id)
      .populate('customer').populate('items.product').populate('createdBy', 'name');
    doc ? res.json(doc) : res.status(404).json({ message: 'Not found' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.create = async (req, res) => {
  try {
    req.body.orderNumber = await generateOrderNumber();
    req.body.createdBy = req.user._id;
    const order = await SalesOrder.create(req.body);
    res.status(201).json(order);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const doc = await SalesOrder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    doc ? res.json(doc) : res.status(404).json({ message: 'Not found' });
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.delete = async (req, res) => {
  try { await SalesOrder.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); }
  catch (err) { res.status(500).json({ message: err.message }); }
};

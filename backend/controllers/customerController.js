const Customer = require('../models/Customer');

exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const query = search ? { $or: [{ name: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }] } : {};
    const data = await Customer.find(query).sort('-createdAt').limit(+limit).skip((+page - 1) * +limit);
    const total = await Customer.countDocuments(query);
    res.json({ data, total, page: +page, pages: Math.ceil(total / +limit) });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
exports.getById = async (req, res) => {
  try { const doc = await Customer.findById(req.params.id); doc ? res.json(doc) : res.status(404).json({ message: 'Not found' }); }
  catch (err) { res.status(500).json({ message: err.message }); }
};
exports.create = async (req, res) => {
  try { res.status(201).json(await Customer.create(req.body)); }
  catch (err) { res.status(400).json({ message: err.message }); }
};
exports.update = async (req, res) => {
  try { const doc = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true }); doc ? res.json(doc) : res.status(404).json({ message: 'Not found' }); }
  catch (err) { res.status(400).json({ message: err.message }); }
};
exports.delete = async (req, res) => {
  try { await Customer.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); }
  catch (err) { res.status(500).json({ message: err.message }); }
};

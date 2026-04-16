const Supplier = require('../models/Supplier');

exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const query = search ? { $or: [{ name: new RegExp(search, 'i') }, { company: new RegExp(search, 'i') }] } : {};
    const data = await Supplier.find(query).sort('-createdAt').limit(+limit).skip((+page - 1) * +limit);
    const total = await Supplier.countDocuments(query);
    res.json({ data, total, page: +page, pages: Math.ceil(total / +limit) });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
exports.getById = async (req, res) => {
  try { const doc = await Supplier.findById(req.params.id); doc ? res.json(doc) : res.status(404).json({ message: 'Not found' }); }
  catch (err) { res.status(500).json({ message: err.message }); }
};
exports.create = async (req, res) => {
  try { res.status(201).json(await Supplier.create(req.body)); }
  catch (err) { res.status(400).json({ message: err.message }); }
};
exports.update = async (req, res) => {
  try { const doc = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true }); doc ? res.json(doc) : res.status(404).json({ message: 'Not found' }); }
  catch (err) { res.status(400).json({ message: err.message }); }
};
exports.delete = async (req, res) => {
  try { await Supplier.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); }
  catch (err) { res.status(500).json({ message: err.message }); }
};

const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, lowercase: true },
  phone: { type: String },
  company: { type: String },
  address: {
    street: String, city: String, state: String, zip: String, country: String,
  },
  taxId: { type: String },
  paymentTerms: { type: String, default: 'Net 30' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Supplier', supplierSchema);

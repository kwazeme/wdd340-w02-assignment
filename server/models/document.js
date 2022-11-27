const mongoose = require('mongoose');

const documentChildSchema = mongoose.Schema({
  id: {type: String, required: true},
  name: {type: String, required: true},
  url: {type: String},
  description: {type: String}
});

const parentDocumentSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  url: { type: String },

  children: [{type: documentChildSchema}]
});


module.exports = mongoose.model('Document', parentDocumentSchema);

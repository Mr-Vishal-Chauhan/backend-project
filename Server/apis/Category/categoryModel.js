const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    autoId: { type: Number, default: 0 },
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() }
})

module.exports = new mongoose.model('category', categorySchema)



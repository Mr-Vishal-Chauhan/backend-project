const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    autoId: { type: Number, default: 0 },
    name: { type: String, default: '' },
    categoryId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'category' },
    model: { type: Number, default: '' },
    price: { type: Number, default: '' },
    image: { type: String, default: 'Image upload' },
    description: { type: String, default: '' },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() }
})

module.exports = new mongoose.model('car', carSchema)



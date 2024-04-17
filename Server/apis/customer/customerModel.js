const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({
    autoId: { type: String, default: 0 },
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    contact: { type: Number, default: 0 },
    userType: { type: Number, default: 3 }, // 3-Customer 2-dealer 1- admin
    address: { type: String, default: '' },
    image: { type: String, default: 'Image upload'},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() }

})

module.exports = new mongoose.model('customer', customerSchema)
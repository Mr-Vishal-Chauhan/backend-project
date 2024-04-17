const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    autoId: { type: Number, default: 0 },
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    contact: { type: Number, default: 0 },
    password: { type: String, default: 0 },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'customer' },
    dealerId: { type: mongoose.Schema.Types.ObjectId, ref: 'dealer' },
    address: { type: String, default: '' },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },

})

module.exports = new mongoose.model('user', userSchema)
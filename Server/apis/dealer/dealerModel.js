const mongoose = require('mongoose')

const dealerSchema = mongoose.Schema({
    autoId: { type: String, default: 0 },
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    contact: { type: Number, default: 0 },
    userType: { type: Number, default: 2 }, // 3-Customer 2-dealer 1- admin
    address: { type: String, default: '' },
    image: { type: String, default: 'Image upload'},
    idProof: { type: String, default: 'proof upload'},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() }

})

module.exports = new mongoose.model('dealer', dealerSchema)
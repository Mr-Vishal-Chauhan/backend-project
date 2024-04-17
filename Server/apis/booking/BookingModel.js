const mongoose = require('mongoose')

const carBookingSchema = new mongoose.Schema({
    carId: {type: mongoose.Schema.Types.ObjectId, ref:'car' },
    bikeId: {type: mongoose.Schema.Types.ObjectId, ref:'bike' },
    pickupLocation: { type: String, required: true },
    dropOffLocation: { type: String,required: true},
    pickupDate: { type: Date, required: true },
    dropOffDate: { type: Date, required: true },
    purpose: {type: String, required: true},
    vehicleType: { type: Number, default: "" },//1- car , 2- bike
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() }
    
  })

module.exports = new mongoose.model('carBooking', carBookingSchema)

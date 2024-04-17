const vehicleBooking = require('./BookingModel')


const booking = async (req, res) => {
    let validation = ""
    if(!req.body.bikeId){
        validation+=" bikeId is required"
    }

    if(!req.body.pickupLocation){
        validation+="  pickupLocation is required"
    }
    
    if(!req.body.dropOffLocation){
        validation+="  dropOffLocation is required"
    }

    if(!req.body.userId){
        validation+="  userId is required"
    }

    if(!req.body.pickupDate){
        validation+="  pickupDate is required"
    }

    if(!req.body.dropOffDate){
        validation+="  dropOffDate is required"
    }

    if(!req.body.purpose){
        validation+="  purpose is required"
    }

    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "validation error :" + validation
        })
    }
    else {
        let total = await vehicleBooking.countDocuments()
        let booking = new vehicleBooking()
        booking.autoId = total + 1
        booking.name = req.body.userId
        booking.pickupLocation = req.body.pickupLocation
        booking.dropOffLocation = req.body.dropOffLocation
        booking.pickupDate = req.body.pickupDate
        booking.dropOffDate = req.body.dropOffDate
        booking.purpose = req.body.purpose
        booking.vehicleType = 2
        booking.save()

            .then((result) => {
                res.send({
                    success: true,
                    status: 200,
                    message: "your booking register successfully",
                    data: result
                })
            })

            .catch((err) => {
                res.send({
                    success: false,
                    status: 500,
                    message: err 
                })
            })
    }
}

const all = (req, res) => {
    vehicleBooking.find(req.body)
    .populate('userId')
    .populate('bikeId')
    .populate('pickupLocation')
    .populate('pickupDate')
    .exec()
    
        .then((result) => {
            res.send({
                success: true,
                status: 200,
                message: "all Booking loaded",
                data: result,
                total: result.length
            })
        })
        .catch((err) => {
            res.send({
                success: false,
                status: 500,
                message: "not required"
            })
        })
}

const single = (req, res) => {
    let validation = ""

    if (!req.body._id) {
        validation = "_id is required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "validation error:" + validation
        })
    }
    else {
        vehicleBooking.findOne({_id: req.body._id})
        .populate('userId')
        
        .exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "booking does not exist"
                    })
                }
                else {
                    res.send({
                        success: true,
                        status: 200,
                        message: "single Booking",
                        data:result
                    })
                }
            })
            .catch((err) => {
                res.send({
                    success: false,
                    status: 500,
                    message: err.message
                })
            })
    }
}

const update = (req, res) => {
    let validation = ''
    if (!req.body._id) {
        validation += '_id is required'
    
    }
    
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: validation
        })
    }
    else {
        vehicleBooking.findOne({ _id: req.body._id }).then((result) => {
            if (result == null) {
                res.send({
                    success: false,
                    status: 400,
                    message: "Booking does not exist"
                })
            }
            else {
                if (!!req.body.pickupLocation) {
                    result.pickupLocation = req.body.pickupLocation
                }
                if (!!req.body.dropOffLocation) {
                    result.dropOffLocation = req.body.dropOffLocation
                }
                if (!!req.body.pickupDate) {
                    result.pickupDate = req.body.pickupDate
                }
                if (!!req.body.dropOffDate) {
                    result.dropOffDate = req.body.dropOffDate
                }
                result.save()
                    .then((updatedBooking) => {
                        res.send({
                            success: true,
                            status: 200,
                            message: 'Booking Updated Successfully',
                            data: updatedBooking
                        })
    
                    }).catch((err) => {
                        res.send({
                            success: false,
                            status: 400,
                            message: err.message
                        })
                    })
    
            }
    
        })
            .catch((err) => {
                res.send({
                    success: false,
                    status: 400,
                    message: err.message
                })
    
            })
    
    
    }
    
    }

const bookingCancel = (req, res) => {
    let validation = ''
    if (!req.body._id) {
        validation += 'Booking Id is required'
    }
    if (!req.body.purpose) {
        validation += 'purpose is required'
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 500,
            message: validation
        })
    }
    else {
        vehicleBooking.findOne({ _id: req.body._id })
            .then((data) => {
                if (data == null) {
                    res.send({
                        success: false,
                        status: 404,
                        message: 'booking not exist'
                    })
                }
            
                else {
                    vehicleBooking.deleteOne({ _id: req.body._id })
                    .then((deletedBooking) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: 'Booking Cancel Successfully',
                                data: deletedBooking
                            })

                        }).catch((err) => {
                            res.send({
                                success: false,
                                status: 404,
                                message: err.message
                            })

                        })
                   
                }        
            })
            .catch((err) => {
                res.send({
                    success: false,
                    status: 500,
                    message: err.message
                })
            })
        
    }
}

module.exports = { booking, all, bookingCancel, single, update}
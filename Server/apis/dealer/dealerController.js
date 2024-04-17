const Dealer = require('./dealerModel')
const User = require('../user/userModel')
const bcrypt = require('bcrypt')



const addDealer = async (req, res) => {

    let validation = ''
    if (!req.body.name) {
        validation += 'Name is required'
    }
    if (!req.body.email) {
        validation += 'email is required'
    }
    if (!req.body.password) {
        validation += 'password is required'
    }
    if (!req.body.contact) {
        validation += 'contact is required'
    }
    if (!req.body.address) {
        validation += 'address is required'
    }

    if (!!validation) {
        res.send({
            success: false,
            status: 500,
            message: validation

        })

    }
    else {
        const prev = await User.findOne({ email: req.body.email })
        if (prev == null) {
            let total = await Dealer.countDocuments()
            let dealer = new Dealer()

            dealer.autoId = total + 1
            dealer.name = req.body.name
            dealer.email = req.body.email
            dealer.contact = req.body.contact
            dealer.address = req.body.address
            dealer.save().then(async (data) => {
                let totalUser = await User.countDocuments()
                let user = new User()
                user.autoId = totalUser + 1
                user.name = req.body.name
                user.dealerId = data._id
                user.email = req.body.email
                user.password = bcrypt.hashSync(req.body.password, 10)
                user.userType = 3
                user.save().then((result) => {
                    dealer.userId = result._id
                    dealer.save().then((data) => {

                        res.send({
                            success: true,
                            status: 200,
                            message: 'Registered Successfully',
                            data: data
                        })
                    }).catch((err) => {
                        res.send({
                            success: false,
                            status: 500,
                            message: err.message

                        })

                    })


                })
                    .catch((err) => {
                        res.send({
                            success: false,
                            status: 500,
                            message: err.message

                        })

                    })

            }).catch(() => {
                res.send({
                    success: false,
                    status: 500,
                    message: err.message

                })

            })

        }
        else {
            res.send({
                success: false,
                status: 500,
                message: 'Email already exist'

            })
        }
    }

}


const allDealer = (req, res) => {
    User.find(req.body)
        .then((result) => {
            res.send({
                success: true,
                status: 200,
                message: 'All category loaded',
                data: result,
                total: result.length
            })

        })
        .catch((err) => {
            res.json({
                success: false,
                status: 300,
                message: err.message
            })

        })

    }
const getSingleDealer = (req, res) => {
   let validation = ''
   if (!req.body._id) {
      validation += '_id is required'
}
if (!!validation) {
    res.send({
        success: false,
        status: 500,
        message: validation
    })
}
else {
    Dealer.findOne({ _id: req.body._id })
        .then((data) => {
            if (data == null) {
                res.send({
                    success: false,
                    status: 404,
                    message: 'No customer found'
                })
            }
            else {
                res.send({
                    success: true,
                    status: 200,
                    message: 'Category Loaded',
                    data: data
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
    Dealer.findOne({ _id: req.body._id }).then((result) => {
        if (result == null) {
            res.send({
                success: false,
                status: 400,
                message: "Category does not exist"
            })
        }
        else {
            if (!!req.body.name) {
                result.name = req.body.name
            }
            if (!!req.body.contact) {
                result.contact = req.body.contact
            }
            if (!!req.body.email) {
                result.email = req.body.email
            }
            if (!!req.body.address) {
                result.address = req.body.address
            }
            result.save()
                .then((updatedData) => {
                    res.send({
                        success: true,
                        status: 200,
                        message: 'Customer Updated',
                        data: updatedData
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


const deleteDealer = (req, res) => {
    let validation = ''
    if (!req.body._id) {
        validation += '_id is required'
    }
    if (!req.body.status) {
        validation += 'status is required'
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 500,
            message: validation
        })
    }
    else {
        User.findOne({ dealerId: req.body._id })
            .then((data) => {
                if (data == null) {
                    res.send({
                        success: false,
                        status: 404,
                        message: 'Customer not exist'
                    })
                }
            
                else {

                    if (!!req.body.status) {
                        data.status = req.body.status
                    }
                    data.save().then(() => {
                        dealer.deleteOne({ _id: req.body._id }).then((deletedCategory) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: 'Account Deleted Successfully',
                                data: deletedCategory
                            })

                        }).catch((err) => {
                            res.send({
                                success: false,
                                status: 404,
                                message: err.message
                            })

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


module.exports = {addDealer ,allDealer ,update , deleteDealer, getSingleDealer}
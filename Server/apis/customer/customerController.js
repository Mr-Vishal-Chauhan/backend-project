const Customer = require('./customerModel')
const User = require('../user/userModel')
const bcrypt = require('bcrypt')



const addCustomer = async (req, res) => {

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
            let total = await Customer.countDocuments()
            let customer = new Customer()

            customer.autoId = total + 1
            customer.name = req.body.name
            customer.email = req.body.email
            customer.contact = req.body.contact
            customer.address = req.body.address
            //customer.image = "profile/"+req.file.filename
            customer.save().then(async (data) => {
                let totalUser = await User.countDocuments()
                let user = new User()
                user.autoId = totalUser + 1
                user.name = req.body.name
                user.email = req.body.email
                user.customerId= data._id
                user.password = bcrypt.hashSync(req.body.password, 10)
                user.userType = 3
                user.save().then((result) => {
                    customer.userId = result._id
                    customer.save().then((data) => {

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

            }).catch((err) => {
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
const allCustomer = (req, res) => {
    Customer.find(req.body)
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
            res.send({
                success: false,
                status: 300,
                message: err.message
            })

        })

    }
const getSingleCustomer = (req, res) => {
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
    Customer.findOne({ _id: req.body._id })
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
    Customer.findOne({ _id: req.body._id }).then((result) => {
        if (result == null) {
            res.send({
                success: false,
                status: 400,
                message: "Customer Id does not exist"
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
            if (!!req.body.image) {
                result.image = req.body.image
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


const deleteCustomer = (req, res) => {
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
        User.findOne({ customerId: req.body._id })
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
                        Customer.deleteOne({ _id: req.body._id }).then((deletedCategory) => {
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

const blockCustomer = (req, res) => {
    validation = ''
    if (!req.body._id) {
        validation += '_id is required'

    }
    if (!req.body.status) {
        validation += 'status is required'

    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation error: " + validation
        })

    }
    else {
        Customer.findOne({ _id: req.body._id }).then((data) => {
            if (data == null) {
                res.send({
                    success: false,
                    status: 400,
                    message: 'Customer does not exist'
                })

            }
            else {

                if (!!req.body.status) {
                    data.status = req.body.status
                }
                data.save().then(() => {
                    User.findOne({ customerId: req.body._id }).then((userData) => {
                        if (!!req.body.status) {
                            userData.status = req.body.status
                        }
                        userData.save()
                            .then((updateData) => {
                                res.send({
                                    success: true,
                                    status: 200,
                                    message: 'Customer Blocked Successfully',
                                    data: updateData
                                })

                            })
                            .catch((err) => {
                                res.send({
                                    success: false,
                                    status: 400,
                                    message: err.message
                                })
                            })
                    }).catch((err) => {
                        res.send({
                            success: false,
                            status: 400,
                            message: err.message
                        })
                    })
                })
                    .catch((err) => {
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



module.exports = { addCustomer, allCustomer, getSingleCustomer, update, deleteCustomer, blockCustomer }
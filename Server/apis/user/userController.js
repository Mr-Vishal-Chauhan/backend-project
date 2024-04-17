const User = require('./userModel')
const bcrypt = require('bcrypt')
const jsonToken = require('jsonwebtoken')
const userModel = require('./userModel')
const secretkey = 'Abc@123'

const login = (req, res) => {
    let validation = ''
    if (!req.body.email) {
        validation += ' Email is required '
    }
    if (!req.body.password) {
        validation += ' Password is required '
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: 'Validation Error:' + validation
        })
    }
    else {
        User.findOne({ email: req.body.email }).then((userData) => {
            if (userData == null) {
                res.send({
                    success: false,
                    status: 404,
                    message: 'Account does not exist'
                })

            }
            else {
                if (bcrypt.compareSync(req.body.password, userData.password)) {
                    if (userData.status) {
                        let payload = {
                            _id: userData._id,
                            name: userData.name,
                            email: userData.email,
                            userType: userData.userType
                        }
                        let token = jsonToken.sign(payload, secretkey, { expiresIn: '24h' })
                        res.send({
                            sucess: true,
                            status: 200,
                            message: 'Login Successfull',
                            data: userData,
                            token: token
                        })

                    }
                    else {
                        res.send({
                            sucess: false,
                            status: 400,
                            message: 'Acount Inactive',

                        })

                    }

                }
                else {
                    res.send({
                        sucess: false,
                        status: 403,
                        message: 'Invalid Email or Password',

                    })

                }
            }

        }).catch((err) => {
            res.send({
                sucess: false,
                status: 400,
                message: err.message

            })

        })

    }
}
const changePassword = (req, res) => {
    let validation = ''
    if (!req.body._id) {
        validation += '_id is required'
    }
    if (!req.body.currPassword) {
        validation += 'currPassword is required'
    }
    if (!req.body.newPassword) {
        validation += 'newPassword is required'
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: 'Validation error' + validation
        })
    }
    else {
        User.findOne({ _id: req.body._id })
            .then((userData) => {
                if (userData == null) {
                    res.send({
                        success: false,
                        status: 404,
                        message: "Account does not exist"
                    })

                }
                else {
                    if (bcrypt.compareSync(req.body.currPassword, userData.password)) {
                        userData.password = bcrypt.hashSync(req.body.newPassword, 10)
                        userData.save().then((userData) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "Password Changed",
                                data: userData

                            })

                        }).catch((err) => {
                            res.send({
                                success: false,
                                status: 403,
                                message: err.message
                            })

                        })

                    }
                    else {
                        res.send({
                            success: false,
                            status: 403,
                            message: 'Current Password does not match'
                        })

                    }

                }

            }).catch((err) => {
                res.send({
                    success: false,
                    status: 403,
                    message: err.message
                })


            })
    }
}

const blockUser = (req, res) => {
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
        User.findOne({ _id: req.body._id }).then((data) => {
            if (data == null) {
                res.send({
                    success: false,
                    status: 400,
                    message: 'User does not exist'
                })

            }
            else {

                if (!!req.body.status) {
                    data.status = req.body.status
                }
                data.save().then(() => {
                    User.findOne({ _id: req.body._id }).then((userData) => {
                        if (!!req.body.status) {
                            userData.status = req.body.status
                        }
                        userData.save()
                            .then((updateData) => {
                                res.send({
                                    success: true,
                                    status: 200,
                                    message: 'User Blocked Successfully',
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

const allUser = (req, res) => {
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
            res.send({
                success: false,
                status: 300,
                message: err.message
            })

        })

    }


module.exports = {
    login, changePassword,blockUser,allUser

}


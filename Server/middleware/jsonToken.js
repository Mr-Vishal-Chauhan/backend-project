const jsonToken = require('jsonwebtoken')
const secretkey = 'Abc@123'


module.exports = (req, res, next) => {

    let token = req.headers['authorization']

    if (!!token) {
        jsonToken.verify(token, secretkey, (err, data) => {
            if (err) {
                res.send({
                    success: false,
                    status: 300,
                    message: 'Unauthorizes Access'
                })

            }
            else {
                next()
            }
        })

    }
    else {
        res.send({
            success: false, 
            status: 403,
            message: 'No token found'
        })
    }
}
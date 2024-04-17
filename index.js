const express = require('express')
const app = express()

const PORT = 5001

const db = require('./Server/config/db')
const seed = require('./Server/config/seed')


app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
    res.send('welcome to server')
})


const customerRoutes = require('./Server/routes/customerRoutes')
const dealerRoutes = require('./Server/routes/dealerRoutes')
const adminRoutes = require ('./Server/routes/adminRoutes')





app.use('/customer', customerRoutes)
app.use('/dealer', dealerRoutes)
app.use('/admin', adminRoutes)




app.listen(PORT, err => {
    if (err) {
        console.log('Error in server', err)
    }
    else {
        console.log('Server is running on port', PORT)

    }
})

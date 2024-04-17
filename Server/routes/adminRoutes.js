const router = require('express').Router()

const dashboardController = require('../apis/dashboard/dashboardController')
const dealerController = require('../apis/dealer/dealerController')
const customerController = require('../apis/customer/customerController')
const categoryController = require('../apis/Category/categoryController')
const userController = require('../apis/user/userController')
const carBookingController = require ('../apis/booking/carBookingController')


router.post('/login', userController.login)

router.use(require('../middleware/jsonToken'))

router.post('/dashboard', dashboardController.adminDashboard)
router.post('/changePassword', userController.changePassword)
router.post ('/userBlock', userController.blockUser)
router.post ('/allUser', userController.allUser)



router.post('/allCustomer', customerController.allCustomer)
router.post('/singleCustomer', customerController.getSingleCustomer)
router.post('/deleteCustomer',customerController.deleteCustomer)




router.post('/allDealer', dealerController.allDealer)
router.post('/singleDealer', dealerController.getSingleDealer)
router.post('/deleteDealer',dealerController.deleteDealer)


router.post ('/allBooking',carBookingController.all)
router.post('/singleBooking', carBookingController.single)

//Category 
router.post('/add', categoryController.add)
router.post('/all', categoryController.allCategory)
router.post('/single', categoryController.getSingleCategory)
router.post('/update', categoryController.update)
router.post('/delete', categoryController.deleteCategory)





router.all('*', (req, res) => {
    res.send({
        success: false,
        status: 404,
        message: "Invalid Address"
    })
})



module.exports = router
const router = require('express').Router()

const customerController = require('../apis/customer/customerController')
const carBookingController = require('../apis/booking/carBookingController')
const bikeBookingController = require('../apis/booking/bikeBookingController')
const userController = require('../apis/user/userController')
const carController = require ('../apis/car/carController')
const bikeController = require ('../apis/bike/bikeController')



const multer = require('multer')

router.post('/signin', customerController.addCustomer)
router.post('/login', userController.login)

router.use(require('../middleware/jsonToken'))

const profileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Server/public/profile')
        
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
        
    }
})

const profileUpload = multer({ storage: profileStorage })


router.post('/single', customerController.getSingleCustomer)
router.post('/update',profileUpload.single('DP_image'), customerController.update)
router.post('/delete', customerController.deleteCustomer)
router.post ('/changePassword', userController. changePassword)

//booking
router.post('/bookingCar', carBookingController.booking)
router.post('/allBookingCar', carBookingController.all)
router.post('/cancelCarBooking', carBookingController.bookingCancel)
router.post('/singleBookingCar', carBookingController.single)
router.post('/updateBookingCar', carBookingController.update)

router.post('/BookingBike', bikeBookingController.booking)
router.post('/allBookingBike', bikeBookingController.all)
router.post('/cancelBikeBooking', bikeBookingController.bookingCancel)
router.post('/singleBookingBike', bikeBookingController.single)
router.post('/updateBookingBike', bikeBookingController.update)


router.post ('/getSingleCar', carController.getSingleCar)
router.post ('/allCar', carController.allCar)
router.post ('/getSingleBike', bikeController.getSingleBike)
router.post ('/allBike', bikeController.allBike)








router.all('*', (req, res) => {
    res.send({
        success: false,
        status: 404,
        message: "Invalid Address"
    })
})



module.exports = router

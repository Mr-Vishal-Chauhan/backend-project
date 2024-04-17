const router = require('express').Router()

const dealerController = require('../apis/dealer/dealerController')
const bikeController = require('../apis/bike/bikeController')
const carController = require('../apis/car/carController')
const userController = require('../apis/user/userController')



const multer = require('multer')

router.post('/signin', dealerController.addDealer)
router.post('/login', userController.login)

router.use(require('../middleware/jsonToken'))

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Server/public/images')
        
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
        
    }
})

const imageUpload = multer({ storage: imageStorage })

router.post('/resetPassword', userController.changePassword)


router.post('/single', dealerController.getSingleDealer)
router.post('/update',imageUpload.single('Profile_image'), dealerController.update)
router.post('/delete', dealerController.deleteDealer)
router.post ('/changePassword', userController. changePassword)


//bike and car 
router.post('/addBike',imageUpload.single('Bike_image'), bikeController.add)
router.post('/allBike', bikeController.allBike)
router.post('/singleBike', bikeController.getSingleBike)
router.post('/updateBike', bikeController.update)
router.post('/deleteBike', bikeController.deleteBike)

router.post('/addCar',imageUpload.single('Car_image'), carController.add)
router.post('/allCar', carController.allCar)
router.post('/singleCar', carController.getSingleCar)
router.post('/updateCar', carController.update)
router.post('/deleteCar', carController.deleteCar)

//booking




router.all('*', (req, res) => {
    res.send({
        success: false,
        status: 404,
        message: "Invalid Address"
    })
})



module.exports = router
const Category = require('../Category/categoryModel')
const user = require('../user/userModel')
const customer = require('../customer/customerModel')
const dealer = require('../dealer/dealerModel')
const car = require('../car/carModel')
const bike = require('../bike/bikeModel')



const adminDashboard = async (req, res) => {
    let totalCategories = await Category.countDocuments()
    let totalUser = await user.countDocuments()
    let totalCustomers = await customer.countDocuments()
    let totalDealer = await dealer.countDocuments()
    let totalCar = await car.countDocuments()
    let totalBike = await bike.countDocuments()



    res.send({
        success: true,
        status: 200,
        message: ' welcome Vishal Chauhan',
        totalCategories: totalCategories,
        totalUser: totalUser,
        totalCustomers: totalCustomers,
        totalDealer: totalDealer,
        totalCar: totalCar,
        totalBike: totalBike

    })

}


module.exports={
    adminDashboard
}
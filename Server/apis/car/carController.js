const Car = require('./carModel')
const Category = require('../Category/categoryModel')



const add = async (req, res) => {
    let validation = ''
    if (!req.body.name) {
        validation += 'Name is Required '
    }
    if (!req.body.categoryId) {
        validation += 'categoryId is Required'
    }
    if (!req.body.description) {
        validation += 'description is Required'
    }
    if (!req.body.price) {
        validation += 'price is Required'
    }
    
    if (!!validation) {
        res.send({
            success: false,
            status: 500,
            message: validation
        })
    }
    else {
        await Category.findOne({ _id: req.body.categoryId }).then(async (result) => {
            if (result == null) {
                res.send({
                    success: false,
                    status: 404,
                    message: "Category Does not exist"
                })

            }
            else {
                let total = await Car.countDocuments()
                let car = new Car()
                car.autoId = total + 1
                car.name = req.body.name
                car.categoryId = req.body.categoryId
                car.description = req.body.description
                car.image = "vehicles/"+req.file.filename
                car.price = req.body.price

                car.save()
                    .then((result) => {
                        res.send({
                            status: 200,
                            success: true,
                            message: "four wheeler is added successfully",
                            data: result
                        })

                    })
                    .catch((err) => {
                        res.send({
                            status: 500,
                            success: false,
                            message: "Internal Server Error",
                            error: err.message
                        })

                    })

            }

        }).catch((err) => {
            res.send({
                status: 500,
                success: false,
                message: "Internal Server Error",
                error: err.message
            })

        })

    }

}



const allCar = (req, res) => {
    Car.find(req.body).populate('categoryId')
    .then((data) => {
        res.send({
            success: true,
            status: 200,
            message: 'All products loaded',
            data: data

        })

    }).catch((err) => {
        res.send({
            success: true,
            status: 200,
            message: err.message


        })
    })

}
const getSingleCar = (req, res) => {
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
     Car.findOne({ _id: req.body._id })
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
     Car.findOne({ _id: req.body._id }).then((result) => {
         if (result == null) {
             res.send({
                 success: false,
                 status: 400,
                 message: "Car does not exist"
             })
         }
         else {
             if (!!req.body.name) {
                 result.name = req.body.name
             }
             if (!!req.body.contact) {
                 result.contact = req.body.contact
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
 
 
 const deleteCar = (req, res) => {
 validation = ''
 if (!req.body._id) {
     validation += '_id is required'
 
 }
 if (!!validation) {
     res.send({
         success: false,
         status: 400,
         message: "Validation error: " + validation
     })
 
 }
 else {
     Car.findOne({ _id: req.body._id }).then((data) => {
         if (data == null) {
             res.send({
                 success: false,
                 status: 400,
                 message: 'Bike does not exist'
             })
 
         }
         else {
 
             if (!!req.body.status) {
                 data.status = req.body.status
             }
 
             data.save().then((updateData) => {
                 res.send({
                     success: true,
                     status: 200,
                     message: 'Delete successfully....',
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
 

module.exports = {add, allCar, getSingleCar, update, deleteCar}
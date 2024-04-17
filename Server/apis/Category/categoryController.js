const Category = require('./categoryModel')


const add = async (req, res) => {
    let validation = ''
    if (!req.body.name) {
        validation += 'Name is Required '
    }
    if (!req.body.description) {
        validation += 'description is Required'
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 500,
            message: validation
        })
    }
    else {
        let prev = await Category.findOne({ name: req.body.name })

        if (prev != null) {
            res.send({
                status: 500,
                success: false,
                message: "Category already exist"
            })
        }
        else {
            let total = await Category.countDocuments()

            let category = new Category()
            category.autoId = total + 1
            category.name = req.body.name
            category.description = req.body.description
            category.save()
                .then((result) => {
                    res.send({
                        status: 200,
                        success: true,
                        message: "Category added successfully",
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


    }

}


const allCategory = (req, res) => {
    Category.find(req.body)
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


const getSingleCategory = (req, res) => {
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
        Category.findOne({ _id: req.body._id })
            .then((data) => {
                if (data == null) {
                    res.send({
                        success: false,
                        status: 404,
                        message: 'No category found'
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


const update = async (req, res) => {
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
        let prev = await Category.findOne({
            $and:[
                { name: req.body.name },
                { _id : { $ne:req.body._id } }
            ]
        })
        if (prev == null) {
            Category.findOne({ _id: req.body._id }).exec()

      .then((result) => {
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
                if (!!req.body.description) {
                    result.description = req.body.description
                }
                result.save()
                    .then((updatedData) => {
                        res.send({
                            success: true,
                            status: 200,
                            message: 'Category Updated',
                            data: updatedData
                        })

                    }).catch(err => {
                        res.send({
                            success: false,
                            status: 500,
                            message: err.message
                        })
                    })
            }
        })
        .catch(err => {
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
        status: 400,
        message: "Category Exists with same name"
    })
}
}
}

const deleteCategory = (req, res) => {
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
        Category.findOne({ _id: req.body._id })
            .then((data) => {
                if (data == null) {
                    res.send({
                        success: false,
                        status: 404,
                        message: ' category does not found'
                    })
                }
                else {
                    Category.deleteOne({ _id: req.body._id })
                        .then((deletedCategory) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: 'Category Deleted successfully',
                                data: deletedCategory
                            })

                        }).catch((err) => {
                            res.send({
                                success: false,
                                status: 404,
                                message: err.message
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



module.exports = { add, allCategory, getSingleCategory, update, deleteCategory }



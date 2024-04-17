const User = require('../apis/user/userModel')
const bcrypt = require('bcrypt')


User.findOne({ email: 'Vishal@gmail.com' }).then((data) => {
    if (data == null) {
        let admin = new User()
        admin.autoId = 1
        admin.name = "Admin"
        admin.email = "Vishal@gmail.com"
        admin.password = bcrypt.hashSync('123', 10)
        admin.userType = 1
        admin.save().then((result) => {
            console.log("Please Created Admin");

        }).catch((err) => {
            console.log('Error in creating admin', err.message);

        })

    }
    else {
        console.log("Admin work successfully")

    }

}).catch((err) => {
    console.log("Error in finding admin", err);

})
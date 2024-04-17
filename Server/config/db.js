const mongoose = require("mongoose")


mongoose.connect("mongodb://127.0.0.1:27017/go-drive")
    .then(() => {
        console.log('Database Connected')

    })
    .catch((err) => {
        console.log('Errro in Database', err)
    })

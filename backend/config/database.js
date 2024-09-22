const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = ()=>{
    mongoose.connect(process.env.DB_URL)
    .then(console.log("Data base connection is successfull"))
    .catch((error)=>{
        console.log("Database connection failed!",error),
        process.exit(1);

    })
}
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    name:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Signup'
    }
})


module.exports = mongoose.model("Todo",todoSchema);



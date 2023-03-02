const { Schema, model } = require("mongoose")

const CartSchema = new Schema({
    title: {
        type: String,
        required: true,
    },  
    price: {
        type: Number,
        required: false
    },
    imageFileSet : {
        type: String,
        required: false
    },   
    count: {
        type: Number
    },
    // user_id : {
    //   type : mongoose.Schema.Types.ObjectId , ref:"user" 
    // }

},{ timestamps: true });

const CartModel = model("cart", CartSchema)
module.exports = CartModel
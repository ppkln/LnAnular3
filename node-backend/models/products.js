const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
let productSchema = mongoose.Schema({
    product_id:{type:String, required:true, unique:true},
    product_name:{type:String,required:true},
    product_price:{type:Number,required:true},
    product_img:{type:String},
    product_description:{type:String,required:true}
},{
    collection:'products'
});
productSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Products",productSchema);
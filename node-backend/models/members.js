const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
let memberSchema = mongoose.Schema({
    e_mail:{type:String, required:true, unique:true},
    pwd:{type:String,required:true},
    fname:{type:String,required:true},
    lname:{type:String,required:true},
    imgMem:{type:String},
    statusWork:{type:Boolean, required:true}
},{
    collection:'members'
});
memberSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Members",memberSchema);
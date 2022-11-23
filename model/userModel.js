const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phone:Number,
    role:String
})

//we have to provide the collection name where user data should be stored.
mongoose.model('users',userSchema); //users is collection name, userSchema will tell the structure of the users table
module.exports=mongoose.model('users');

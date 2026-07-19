const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required:true,
        minLength: 4,
        maxLength: 30,
    },
    lastName:{
        type: String
    },
    email:{
        type: String,
        required : true,
        lowercase: true,
        index: true,
        unique:true,
        trim: true,
        sparse: true,
    },
    password:{
        type: String,
        required:true,
    },
    age:{
        type: Number,
        min: 18,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender is not valid");
            }
        }
    },
    photoUrl:{
        type: String,
        default:"https://img.magnific.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740&q=80"
    },
    about:{
        type:String,
        default: "This is the default about the User",
    },
    skills:{
        type:[String],
    },
},{timestamps: true});

module.exports = mongoose.model("User", userSchema);

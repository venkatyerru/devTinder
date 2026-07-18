const mongoose = require("mongoose");


const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://venkatnode:nani123@venkatnode.lc9ekvp.mongodb.net/devTinder");

}



module.exports ={
    connectDB,
}

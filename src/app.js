const express = require("express");

const {connectDB}= require("./config/database.js");

const app = express();

const {adminAuth, userAuth} = require("./middlewares/auth");

const User = require("./models/user.js");

app.use(express.json());

app.post("/signup",async (req,res)=>{
    console.log(req.body);

 try{
    //creating new instance of the user Model
    const user = new User(req.body);

    await user.save();

    res.send("user is created successfully in the Db");

}
catch(err){
    res.status(400).send("some thing went wrong while creating new record"+ err.message);
}
})

connectDB().then(()=>{
    console.log("DB connection is successfully established");
    app.listen(3000, () => {
  console.log("server is listening successfully");
});
}).catch(err =>{
    console.log("DB connection is failed ")
})



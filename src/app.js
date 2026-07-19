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

app.get("/user", async (req,res)=>{
    const userEmail = req.body.email;
    console.log(userEmail);
try{
   const users= await User.findOne({email:userEmail});

    if (!users){
        res.status(404).send("User not found In DB");
    }
    else{
   res.send(users);
    }
}


// try{
//    const users= await User.find({email:userEmail});

//     if (users.length === 0){
//         res.status(404).send("User not found In DB");
//     }
//     else{
//    res.send(users);
//     }
// }
catch(err){
    res.status(400).send("User Not found");
}
})

app.get("/feed", async(req,res)=>{    
try{
   const users= await User.find({});
   res.send(users);
}
catch(err){
    res.status(400).send("something went wrong");
}
})

app.delete("/user",async(req,res)=>{

    const userId = req.body.userId;
    
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("Delete user successfully with this ID:"+ userId);

    }
    catch(err){

        res.status(400).send("user NOT_FOUND to delete");

    }
})

app.patch("/user", async(req,res)=>{

    const userId = req.body.userId;
    const data = req.body
 try{
    const users = await User.findByIdAndUpdate({_id:userId}, data , {runValidators: true});

    console.log(users);

    res.send("User has been updated successfully with this ID"+ userId);
    
 }
 catch(err){
    res.status(400).send("Update Failed" + err.message);
 }
})  

// app.patch("/user2", async(req,res)=>{

//     const email = req.body.email;
//     const data = req.body
//  try{
//     const users = await User.findOneAndUpdate({email:email}, data);

//     console.log(users);

//     res.send("User has been updated successfully");
    
//  }
//  catch(err){
//     res.status(400).send("something went wrong");
//  }
// })

connectDB().then(()=>{
    console.log("DB connection is successfully established");
    app.listen(3000, () => {
  console.log("server is listening successfully");
});
}).catch(err =>{
    console.log("DB connection is failed ")
})



const express = require("express");

const {connectDB}= require("./config/database.js");

const app = express();

const {adminAuth, userAuth} = require("./middlewares/auth");

const User = require("./models/user.js");

const {validateSignUpData} = require("./utils/validation.js");

const bcrypt = require("bcrypt");


app.use(express.json());

app.post("/signup", async (req,res)=>{

    
    console.log(req.body);

 try{
    //creating new instance of the user Model
    validateSignUpData(req);

    const {firstName,lastName,email,password,photoUrl,about,gender,age,skills} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    const user = new User({firstName,lastName,email,password:hashedPassword,photoUrl,about,gender,age,skills});

    await user.save();

    res.send("user is created successfully in the Db");

}
catch(err){
    res.status(400).send("ERROR: "+ err.message);
}
})

app.post("/login",async(req,res)=>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email: email});

        if(!user){
            throw new Error("Bad credentials please try again");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid){
            res.send("Login sucessfull!!!");
        }
        else{
            res.status(500).send("Bad credentials please try again");
        }
    }
    catch(err){
        res.status(400).send("Error:" + err.message);
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

app.patch("/user/:userId", async(req,res)=>{

    const userId = req.params?.userId;
    const data = req.body
 try{

     const ALLOWED_UPDATES =["userid", "photoUrl","about","gender","age","skills","password"]

    const isUpdateAllowed = Object.keys(data).every((k)=> ALLOWED_UPDATES.includes(k));

    if(!isUpdateAllowed){
        throw new Error("update not allowed")
    }
    if(data?.skills.length >=10){
        throw new Error("Length of skills execeed");
    }
    const users = await User.findByIdAndUpdate({_id:userId}, data , {runValidators: true});

    res.send("User has been updated successfully with this ID"+ userId);
    
 }
 catch(err){
    res.status(400).send("Update Failed " + err.message);
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



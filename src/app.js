const express = require("express");

const app = express();

const {adminAuth, userAuth} = require("./middlewares/auth");

app.use("/admin", adminAuth)

app.get("/admin/adddata",(req,res)=>{
  res.send("successfully added");
})

app.get("/getUserData",(req,res)=>{

    try{
        throw new Error("brother");
    }

    catch(err){
        res.status(500).send("please contact support team");
    }

})

app.get("/user/adddata", userAuth, (req,res)=>{

    throw new Error("bad one");
  res.send("user is successfully added");
})

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("some thing went wrong please try again later");
    }
})

app.post("/user/login",(req,res)=>{

    res.send("user logged in successfully");

})



app.listen(3000, () => {
  console.log("server is listening successfully");
});

const express = require("express");

const app = express();

const {adminAuth, userAuth} = require("./middlewares/auth");

app.use("/admin", adminAuth)

app.get("/admin/adddata",(req,res)=>{
  res.send("successfully added");
})

app.get("/user/adddata", userAuth, (req,res)=>{
  res.send("user is successfully added");
})

app.post("/user/login",(req,res)=>{

    res.send("user logged in successfully");

})




// app.get(
//   "/user",

//   (req, res,next) => {
//      res.send("hello this is user");
//     // next();
//     // res.send("hello");
//   }
// );

// app.get("/user",
//   (req, res) => {
//     res.send("hello this user handler 2");
//   })


app.listen(3000, () => {
  console.log("server is listening successfully");
});

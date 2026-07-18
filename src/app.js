const express = require("express");

const app = express();

app.use(
  "/user",

  (req, res,next) => {
    // res.send("hello this is user");
    next();
    res.send("hello");
  },
  (req, res) => {
    res.send("hello this user handler 2");
  }
);

// app.get("/user/:userId", (req, res)=>{
//     console.log(req.params);
//     res.send(`{query params we got ${req.params.userId}}`);
// });
// app.post("/user", (req, res)=>{
//     //saving data to DB
//     res.send("Data Sucessfully stored to the database");
// });

// app.delete("/user", (req, res)=>{
//     //saving data to DB
//     res.send("Dlete to the database");
// });
// app.use("/test",(req, res)=>{
// res.send("hello from the namaste dashboard");
// });

app.listen(3000, () => {
  console.log("server is listening successfully");
});

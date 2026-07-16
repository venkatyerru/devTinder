const express = require('express');

const app = express();

app.get("/user", (req, res)=>{
    res.send({firstName: "Venkat"});
})
app.post("/user", (req, res)=>{
    //saving data to DB
    res.send("Data Sucessfully stored to the database");
})

app.delete("/user", (req, res)=>{
    //saving data to DB
    res.send("Dlete to the database");
})
app.use("/test",(req, res)=>{
res.send("hello from the namaste dashboard");
});

app.listen(3000,()=>{
    console.log("server is listening successfully");
});

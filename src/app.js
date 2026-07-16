const express = require('express');

const app = express();

app.use("/", (req,res)=>{
    res.send("Hello venkat yerru");
})
app.use("/test",(req, res)=>{
res.send("hello from the namaste dashboard");
});

app.use("/hello",(req, res)=>{
res.send("hello hello hello");
});

app.listen(3000,()=>{
    console.log("server is listening successfully");
});

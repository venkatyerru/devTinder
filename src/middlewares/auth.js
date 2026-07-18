const adminAuth = (req,res,next)=>{
    // res.send("heellolluuuuu")
    console.log("admin auth is getting checked");
    const token="xyz";
   const isAuthorized = token === "xyz";

   if(isAuthorized){
    next();
   }
   else{
    res.status(401).send("unauthorized status");
   }
};

const userAuth = (req,res,next)=>{
    // res.send("heellolluuuuu")
    console.log("user auth is getting checked");
    const token="xyz";
   const isAuthorized = token === "xyz";

   if(isAuthorized){
    next();
   }
   else{
    res.status(401).send("unauthorized status");
   }
};

module.exports={adminAuth, userAuth,};


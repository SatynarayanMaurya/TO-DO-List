const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1]
        // console.log("Token is : ",token)
    //    const token =await req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ","");
        if(!token){
            return res.status(402).json({
                success:false,
                message:"Token is missing"
            })
        }
        // Here we have a valid token
        try{
            // console.log("I am in decode try block")
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            // console.log("Decoded token is : ",decode);
            req.user = decode;
            
        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:"Token is invalid"
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Some thing went wrong while validating the token"
        })
    }
}
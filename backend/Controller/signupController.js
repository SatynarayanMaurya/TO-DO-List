const Signup = require("../Models/signupSchema")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
exports.signup = async (req,res)=>{
    try{
        const {name, email, password, confirmPassword} = req.body;

        if(!name || !email || !password || !confirmPassword){
            return res.status(500).json({
                success:false,
                message:"All fields are required"
            })
        }
        if(password !== confirmPassword){
            return res.status(500).json({
                success:false,
                message:"Password and confirm password are not matched !"
            })
        }

        const existingUser = await Signup.findOne({email});
        if(existingUser){
            return res.status(500).json({
                success:false,
                message:"User already exist !"
            })
        }
        

        // hash the password
        const hashedPassword = await bcrypt.hash(password,10);
        
        // Create the user
        const user = await Signup.create({name,email,password:hashedPassword});
        return res.status(200).json({
            success:true,
            message:"User registered successfully ! ",
            user,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"sign up failed : ",
            ErrorMessage:error
        })
    }
}


exports.login = async (req,res)=>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(401).json({
                success:false,
                message:"Please fill the required Field"
            })
        }
        

        const user = await Signup.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered, Please go and sign up first"
            })
        }
        
        // Now compare the password
        const checkPassword =  bcrypt.compare(password, user.password);
       
        if(checkPassword){
            
            // Generate a token
            const token =  jwt.sign(
                {
                    email:user.email,
                    id:user._id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "24h"
                }
            )
            user.token = token;
            user.password = undefined;

            const options = {
                expires : new Date(Date.now() + 5 * 24 * 3600 * 1000),
                httpOnly:true
            }
            
            return res.cookie("token", token, options).status(200).json({
                success:true,
                message:"User logged in successfully ",
                user
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password is incorrect"
            })
        }


    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"catch error! Failed to login",
            error:error
        })
    }
}
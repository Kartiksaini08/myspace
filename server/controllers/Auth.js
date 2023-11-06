const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
require("dotenv").config();

exports.signup = async (request, respond) => {
    try{
        const {name, email , password} = request.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return respond.status(400).json({
                success:false,
                message:"User already exist in database",
            });
        }
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err){
            return respond.status(401).json({
                success:false,
                message:"Error while hashing the password",
            });
        }
        const user = await User.create({name, email, password: hashedPassword});        
        return respond.status(200).json({
            success:true,
            message:"User created succesfully",
        });
    }
    catch(error){
        return respond.status(500).json({
            success:false,
            message:"Internal Server error",
        })
    }
}

exports.login = async (request, respond) => {
    try{
        const {email , password } = request.body;
        if(!email || !password) {
            return respond.status(400).json({
                success:false,
                message:"Please fill all details",
            });
        }
        let user = await User.findOne({email});
        if(!user){
            return respond.status(401).json({
                success:false,
                message:"User is not registered",
            });
        }

        const payload = {
            email: user.email,
            id: user._id
        };

        if(await bcrypt.compare(password , user.password)){
            let token = jwt.sign(payload, process.env.JWT_SECRET , { expiresIn: "2h" });
            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {       // this time period is equal to 3 days after 3 days cookies will expire
                expires: new Date( Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }
            respond.cookie("token", token , options); // name must be same as cookie token 
            respond.status(200).json({  
                success:true,
                token,
                user, 
                message:"User signed in successfully"
            });
        }
        else{
            return respond.status(402).json({
                success:false,
                message:"Please enter correct password",
            });
        }
    }
    catch(error){
        return respond.status(500).json({
            success:false,
            message:`Internal Server error ${error}`,
        });
    }
}
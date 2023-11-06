const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (request, respond , next) => {
    try{
        console.log("body------->" , request.body.token);
        // console.log("Cookie----->" , request.cookies.token );
        // console.log("header---->" , request.header("Authorization"));
        const token = request.body.token;
        if(!token || token === undefined){
            return respond.status(400).json({
                success:false,
                message:"Token is empty or undefined",
            });
        }
        // this line will verify and decode all details like name, email and id from json
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET); 
            console.log(payload);
            request.user = payload;
            // request.body.user = payload;
            // console.log(request.body);
        }
        catch(error){
            return respond.status(401).json({
                success:false,
                message:"Invalid JWT Token"
            });
        }
        next();
    }
    catch(error){
        return respond.status(500).json({
            success:false,
            message:'Something went wrong, while verifying the token',
            error:error.message,
        })
    }
}
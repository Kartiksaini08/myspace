// app create
const express = require("express");
const app = express();

// connection of frontend with backend
const cors=require("cors");
const corsOptions ={
    origin:'*', 
    credentials:true,            // access-control-allow-credentials:true
    optionSuccessStatus:200,
}

app.use(cors()) // Use this after the variable declaration



// muje port find karna h
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// using cookie parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// middleware add karna h
app.use(express.json());


app.use(express.urlencoded({extended: true}));

// fileupload middleware for uploading files on server
// const fileupload = require("express-fileupload");
// app.use(fileupload({
//     useTempFiles:true,
//     tempFileDir:'/tmp/'
// }));



// db se coonect karna h
const dbConnect = require("./config/database");
dbConnect();

// muje cloudinary se connect karna h
const cloudinaryConnect = require("./config/cloudinary");
cloudinaryConnect();



// muje api route mount karn h
const Upload = require("./routes/FileUpload");
app.use("/api/v1", Upload);



// activate server 
app.listen(PORT,  () => {
    console.log(`App is running at ${PORT}`);
})
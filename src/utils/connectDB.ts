import mongoose from "mongoose";

export function connectDB(){
    mongoose.Promise=Promise
    console.log(process.env.MONGODB_URI+" ENV not working")
    mongoose.connect("mongodb+srv://Saim:Password@cluster0.tkv8u4s.mongodb.net/?retryWrites=true&w=majority").then(()=>{
        console.log("Connected to DB")
    }).catch((err)=>{
        console.log("error while Connecting to DB => \n" +err)
    })

}
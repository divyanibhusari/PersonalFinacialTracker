import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config({ path: "./config.env" })

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL,{})
        console.log("Connection with database was SuccessFul");
    }catch(err){
        console.log("Connection with database wasnot SuccessFul",err)
        process.exit(1);
    }
}

export default connectDB
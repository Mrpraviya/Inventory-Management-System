import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connection created successfully");

    } catch (error) {
        console.error("Connection failed", error.massage);
        process.exit(1);
    }
}

export default connectDB;
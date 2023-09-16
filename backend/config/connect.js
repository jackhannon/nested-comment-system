import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const connectionString = process.env.ATLAS_URI
console.log(connectionString)

const connectToDatabase = async () => {
  try {
    await mongoose.connect(connectionString, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    })
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export { connectToDatabase }
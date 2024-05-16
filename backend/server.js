import express from "express";
import { connectToDatabase } from "./config/connect.js";
import cors from 'cors'
import { credentials } from "./middleware/credentials.js";
import corsOptions from "./config/corsOptions.js";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import { router } from "./routes/routes.js";
import seed from "./seed.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";
dotenv.config()



async function startServer() {
  const port = process.env.PORT || 5001;
  await connectToDatabase()

  const app = express()

 

  app.use(credentials)
  app.use(cors(corsOptions.corsOptions))

  app.use(bodyParser.json())

  seed()
  app.get("/", (req, res) => {
    res.send("Hello, this is the root endpoint!");
  });

  app.use('/posts', router)
  
  app.use(errorHandler)
  app.use(notFound)

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
  })
  
}

startServer()
import express from "express"
import { LoadData } from "./dataloaders/youtube"
import { contentRouter } from "./routes/content"
import dotenv from "dotenv";
dotenv.config();
const app= express()
app.use(express.json())

// add cors
app.use('/contents' , contentRouter)
app.listen(8080)
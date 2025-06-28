import express from "express"
import cors from "cors"
import { contentRouter } from "./routes/content"
import dotenv from "dotenv";
import { queryRouter } from "./routes/query";
dotenv.config();
const app= express()
app.use(cors())
app.use(express.json())

// add cors
app.use('/contents' , contentRouter)
app.use('/query' ,queryRouter )
app.listen(8080)



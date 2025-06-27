import { json, Router } from "express";
import express from "express";
import { LoadDataYT } from "../dataloaders/youtube";
import { embeddings, llm, textSplitter, vectorStore } from "../cofig";
import { Document } from "langchain/document";
import { DBpush } from "../util";
export const contentRouter = Router();
contentRouter.use(express.json());


contentRouter.post("/", async (req, res) => {
    const docs = await LoadDataYT(req.body.url);
    await DBpush(docs , req)
    res.json({
        msg: "data added succesfully",
    });
});




contentRouter.post("/twitter", (req, res) => {
    // load twitter d
});

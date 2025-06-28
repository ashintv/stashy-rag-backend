import { json, Router } from "express";
import express from "express";
import { LoadDataYT } from "../dataloaders/youtube";
import { embeddings, llm, textSplitter, vectorStore } from "../cofig";
import { Document } from "langchain/document";
import { DBpush } from "../util";
import { AuthMiddleware } from "../middlewares/auth";
import { LoadDataTweet } from "../dataloaders/twitter";

export const contentRouter = Router();
contentRouter.use(express.json());

contentRouter.post("/youtube", async (req, res) => {
    const docs = await LoadDataYT(req.body.url);
    await DBpush(docs, req);
    res.json({
        msg: "data added succesfully",
    });
});

contentRouter.post("/twitter", async (req, res) => {
    const docs = await LoadDataTweet(req.body.url.split("/").pop());
   
    res.json({
        docs,
    });

});

contentRouter.post("/pdf", async (req, res) => {
    console.log(req.body.url.split("/").pop());
    const docs = await LoadDataTweet(req.body.url.split("/").pop());
    res.json({
        docs,
    });
});

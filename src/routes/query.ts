import { Router } from "express";
import express from "express";
import { llm, vectorStore } from "../cofig";

export const queryRouter = Router();
queryRouter.use(express.json());
queryRouter.get("/", async (req, res) => {
    const similaritySearchResults = await vectorStore.similaritySearch(
        req.body.query,
        6
    );
    //TODO: HOW can i pass metadata 
    const context = similaritySearchResults.map((doc) => doc.pageContent).join("\n");
    const prompt = `You are an assistant. Use the following context to answer the question.
                        Context:${context}
                        Question: ${req.body.query}
                        Answer:`;
    const answer = await llm.invoke(prompt);
    console.log(answer);

    res.json({
        answer,
    });
});

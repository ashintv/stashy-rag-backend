import { json, Router } from "express";
import express from "express";
import { LoadData } from "../dataloaders/youtube";
import { embeddings, llm, textSplitter, vectorStore } from "../cofig";
import { Document } from "langchain/document";

export const contentRouter = Router();
contentRouter.use(express.json());

contentRouter.post("/youtube", async (req, res) => {
    const docs = await LoadData(req.body.url);
    console.log(docs)
    const cleaned = docs[0].pageContent.replace(/\[.*?\]/g, "");
    const texts = await textSplitter.splitText(cleaned);

    // Convert chunks into LangChain documents
    const docChunks = texts.map(
        (text, i) =>
            new Document({
                pageContent: text,
                metadata: {
                    chunk: i,
                    source: req.body.url,
                },
            })
    );

    const vector = await embeddings.embedDocuments(texts); // optional step
    await vectorStore.addDocuments(docChunks); // this is the correct call

    //similiarty search
    const similaritySearchResults = await vectorStore.similaritySearch(
        req.body.query,
        2
    );
    for (const doc of similaritySearchResults) {
        console.log(
            `* ${doc.pageContent} [${JSON.stringify(doc.metadata, null)}]`
        );
    }

    const context = similaritySearchResults
        .map((doc) => doc.pageContent)
        .join("\n");

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

//.     eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.nc7YtQ4sWGM4erspBqAErpgzsJjpZZfT7Wd_Ufd5pd0
//.     https://ea5875b6-6f91-4050-b484-bf1a552659bc.europe-west3-0.gcp.cloud.qdrant.io

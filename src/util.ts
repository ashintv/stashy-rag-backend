import { Request } from "express";
import { embeddings, textSplitter, vectorStore } from "./cofig";
import { Document } from "langchain/document";
export async function DBpush(docs:string|any , req:Request) {
        const cleaned = docs[0].pageContent.replace(/\[.*?\]/g, "");
    const texts = await textSplitter.splitText(cleaned);
    // Convert chunks into LangChain documents
    const docChunks = texts.map(
        (text, i) =>
            new Document({
                pageContent: text,
                metadata: {
                    //@ts-ignore obtain from middleware
                //     userid: req.userID,
                    id: req.body.id,
                    chunk: i,
                    type: "youtube",
                    source: req.body.url,
                },
            })
    );

    await vectorStore.addDocuments(docChunks);
}
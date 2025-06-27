import dotenv from "dotenv";
dotenv.config();
const LANGSMITH_TRACING = process.env.LANGSMITH_TRACING;
const LANGSMITH_API_KEY = process.env.LANGSMITH_API_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

import { ChatGroq } from "@langchain/groq";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { QdrantVectorStore } from "@langchain/qdrant";

export const llm = new ChatGroq({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    apiKey: GROQ_API_KEY,
});

export const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 100,
});

export const embeddings = new HuggingFaceInferenceEmbeddings({
    model: "sentence-transformers/all-MiniLM-L6-v2",
    apiKey: process.env.HUGGINGFACE_API, // Get free key from huggingface.co/settings/tokens
});

export const vectorStore = new QdrantVectorStore(embeddings, {
    url: process.env.QRNT_URL,
    apiKey: process.env.QRNT_API,
    collectionName: "a-test-collection",
});

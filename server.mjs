// server.mjs
import dotenv from "dotenv";
import OpenAI from "openai";
import express from "express";
import { APItest } from "./APImain.mjs";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

console.log(
  "OPENAI_API_KEY:",
  process.env.OPENAI_API_KEY ? "Present" : "Not Found"
);

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/getResponse", APItest(client));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

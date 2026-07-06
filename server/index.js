import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import fs from 'fs/promises';
import cors from 'cors';

import { GoogleGenAI } from '@google/genai';
import { loadKnowledgeBase } from './prompts/systemPrompt.js';

const app = express();
const upload = multer();

const GEMINI_MODEL = process.env.GEMINI_MODEL;
const key = process.env.GEMINI_API_KEY;

const ai = key ? new GoogleGenAI({ apiKey: key }) : null;
const knowledgeBase = loadKnowledgeBase();
const systemInstruction = `
You are Fatchur's AI assistant.

The following information is your COMPLETE knowledge base.

Everything between BEGIN KNOWLEDGE BASE and END KNOWLEDGE BASE is factual information about Fatchur.

BEGIN KNOWLEDGE BASE

${knowledgeBase}

END KNOWLEDGE BASE

Instructions:
- Answer ONLY using the knowledge base.
- Never fabricate information.
- If the answer cannot be found, say you don't know.
- If information is unavailable, invite the user to contact Fatchur.

Formatting Rules:
- Respond in plain text.
- Do NOT use Markdown.
- Do NOT use bold (**), italic (*), headings (#), tables, or code blocks unless explicitly requested.
- Use short paragraphs or bullet lists when appropriate.
`;

app.use(express.json());

app.use(cors());

app.post("/api/chat", async (req, res) => {
    const { conversation } = req.body;

    if (!Array.isArray(conversation))
        throw new Error("conversation must be an array");

    const contents = conversation.map(({ role, text }) => ({
        role,
        parts: [{ text }]
    }));

    console.log('test:', systemInstruction);

    const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents,
        config: {
            temperature: 0.9,
            systemInstruction: {
            parts: [
                {
                text: systemInstruction,
                },
            ],
            },
        },
    });

    res.json({
        reply: response.text
    });
});

app.post('/generate-text', async (req, res) => {
    const { prompt } = req.body;

    try {
        // const response = await ai.models.generateContent({
        //     model: GEMINI_MODEL,
        //     contents: prompt
        // });

        const response = await ai.interactions.create({
            model: GEMINI_MODEL,
            input: prompt,
        });

        res.status(200).json({ result: response.output_text });
        // res.status(200).json({ result: response.text });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

app.post('/generate-from-file', upload.single("file"), async (req, res) => {
    const { prompt } = req.body;
    const base64File = req.file.buffer.toString("base64");

    try {
        
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: [
                { text: prompt, type: "text" },
                { inlineData: { data: base64File, mimeType: req.file.mimetype } }
            ]
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
})

app.post('/generate-from-image', upload.single("image"), async (req, res) => {
    const { prompt } = req.body;
    const base64Image = req.file.buffer.toString("base64");

    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: [
                { text: prompt, type: "text" },
                { inlineData: { data: base64Image, mimeType: req.file.mimetype } }
            ]
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});


app.post('generate-from-document', upload.single("document"), async(req, res) => {
    const { prompt } = req.body;
    const base64Document = req.file.buffer.toString("base64");

    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: [
                { text: prompt ?? "Tolong buat ringkasan dari dokumen berikut.", type: "text" },
                { inlineData: { data: base64Document, mimeType: req.file.mimetype } }
            ]
        })
    } catch (error) {
        console.log(e);
        res.status(500).json({ message: error.message });
    }
});

app.post('/generate-from-audio', upload.single("audio"), async (req, res) => {
    const { prompt } = req.body;
    const base64Audio = req.file.buffer.toString("base64");

    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: [
                { text: prompt, type: "text" },
                { inlineData: { data: base64Audio, mimeType: req.file.mimetype } }
            ]
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});



const PORT = 3002;

app.listen(PORT, () => console.log(`Server ready on http://localhost:${PORT}`));
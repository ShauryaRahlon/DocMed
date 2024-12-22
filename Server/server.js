
import dotenv from "dotenv";
dotenv.config();
// const express = require('express');
import express from 'express';
// const fileUpload = require('express-fileupload');
import fileUpload from 'express-fileupload';
// const { GoogleGenerativeAI } = require('@google/generative-ai');
import { GoogleGenerativeAI } from '@google/generative-ai';
// const fs = require('fs');
import fs from 'fs';
// const cors = require('cors');
import cors from 'cors';

const app = express();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.use(cors());
app.use(fileUpload());

// Endpoint for image captioning
app.post('/caption', async (req, res) => {
    if (!req.files || !req.files.image) {
        return res.status(400).send('No file uploaded.');
    }

    const image = req.files.image;
    const imageBuffer = image.data;

    try {
        const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-pro' });

        const result = await model.generateContent([
            {
                inlineData: {
                    data: imageBuffer.toString('base64'),
                    mimeType: image.mimetype,
                },
            },
            'Medically Sumarize this image and if it is unrelated to medicine industry output please enter a valid image and dont output anything else',
        ]);
        res.json({ caption: result.response.text() });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error generating caption.');
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

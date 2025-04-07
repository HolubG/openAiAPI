import dotenv from 'dotenv'
import OpenAI from 'openai'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { createAPIResponse } from './APIResponse.mjs'
import { responseObject } from './responseFormat.mjs'
import { handleAPIerror } from './errorHandling.mjs'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = 3500

app.use(express.json())
app.use(express.static(path.join(__dirname, 'client')))

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

app.post('/httpCommunication', async (req, res) => {
    const { message } = req.body

    if (!message || typeof message !== 'string') {
        return res.status(400).json({
            status: 'error',
            message: "Invalid input. 'message' must be a non-empty string.",
            data: null,
        })
    }

    if (message) {
        try {
            const response = await createAPIResponse(client, message)
            const responseFormating = responseObject(response)

            res.json({
                status: 'success',
                message: 'Message received successfully.',
                data: {
                    receivedMessage: message,
                    aiResponse: responseFormating,
                },
            })
        } catch (error) {
            handleAPIerror(error, res)
        }
    }
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'))
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    console.log(`Open http://localhost:${port} in your browser`)
})

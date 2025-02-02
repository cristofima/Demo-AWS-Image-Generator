require('dotenv').config();
const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});

const bedrock = new AWS.Bedrock();

app.post('/generate-image', async (req, res) => {
    try {
        const { prompt } = req.body;
        const params = {
            modelId: 'amazon.titan-image-generator-v2:0',
            inputText: prompt
        };
        
        const response = await bedrock.invokeModel(params).promise();
        res.json({ image: response.generatedImage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('API running on port 3000'));
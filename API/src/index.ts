import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/generate-image", async (req: Request, res: Response) => {
  const client = new BedrockRuntimeClient({
    region: process.env.AWS_REGION ?? "",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY ?? "",
      secretAccessKey: process.env.AWS_SECRET_KEY ?? "",
    },
  });

  try {
    const { prompt } = req.body;

    const input = {
      contentType: "application/json",
      accept: "*/*",
      modelId: "amazon.titan-image-generator-v2:0",
      body: JSON.stringify({
        taskType: "TEXT_IMAGE",
        textToImageParams: { text: prompt },
        imageGenerationConfig: {
          numberOfImages: 1,
          quality: "standard",
          cfgScale: 8.0,
          height: 512,
          width: 512,
          seed: 0,
        },
      }),
    };

    const command = new InvokeModelCommand(input);
    const response = await client.send(command);

    const { body, $metadata } = response;

    if ($metadata.httpStatusCode === 200) {
      const textDecoder = new TextDecoder("utf-8");
      const jsonString = textDecoder.decode(body.buffer);
      const parsedData = JSON.parse(jsonString);
      const image = parsedData.images[0];

      res.status(200).json({ image: image });
    } else {
      res
        .status($metadata.httpStatusCode ?? 400)
        .json({ message: "Fail to generate image" });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  } finally {
    client.destroy();
  }
});

app.listen(3000, () => console.log("API running on port 3000"));

import express from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api", async (req, res) => {
  const configuration = new Configuration({
    apiKey: req.body.apiKey,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const prompt = req.body.prompt;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      max_tokens: 2000,
      temperature: 0.2,
    });

    res.status(200).send({
      bot: response.data.choices[0].text.toString(),
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ e });
  }
});

app.listen(5000, () =>
  console.log("AI is listening on port http://localhost:5000")
);

require('dotenv').config();
const express = require('express');
const app = express();
const port = 3080;
const bodyParser = require('body-parser');
const cors = require('cors');
// const dotenv = require('dotenv')
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    organization: "org-OylubCPNRaFKkSURAeOWIIdg",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
app.use(bodyParser.json());
app.use(cors());

app.post('/',async(req, res)=>{
    const { message, currentModel  } = req.body;
    const response = await openai.createCompletion({
        model: `${currentModel}`,
        prompt: `Pretend that you are a best friend who helps his friend in any condition and you are a talkative person who hold the conversation for long time. - ${message}`,
        max_tokens: 100,
        temperature: 0.5,
      });

      res.json({
        message: response.data.choices[0].text,
      })
})
app.get('/models',async(req, res)=>{
    
    const response = await openai.listEngines();
    res.json({
      models: response.data.data
    })
})

app.listen(port, ()=>{
    console.log(`The server is running on http://localhost:${port}/`)
})
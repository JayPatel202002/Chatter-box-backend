require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3080;
const bodyParser = require('body-parser');
const cors = require('cors');
// const dotenv = require('dotenv')
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
app.use(bodyParser.json());
app.use(cors());

app.post('/',async(req, res)=>{
    const prompt = req.body.prompt;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt}`,
        max_tokens: 4000,
        temperature: 0,
        top_p:1,
        frequency_penaltiy: 0.5,
        presence_penalty: 0
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
    res.send("success!!");
})

app.listen(port, ()=>{
    console.log(`The server is running on http://localhost:${port}/`)
})

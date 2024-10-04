
import express from 'express';
import axios from 'axios';
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
//

const app = express();
const port = 3001;
const __dirname = dirname(fileURLToPath(import.meta.url));


app.set('view engine', 'ejs');
app.set('views', __dirname);


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req,res) => {
    res.render(__dirname +'/index.ejs')
});


app.post("/sendMessage", async (req,res) => {
    const userInput = req.body.userInput;
    const options = {
    method: 'POST',
    url: 'https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions',
    headers: {
      'x-rapidapi-key': 'b37e7d5285msh4f70eac66c59bf7p1d787ejsn892396d79404',
      'x-rapidapi-host': 'cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      messages: [
        {
          role: 'user',
          content: userInput
        }
      ],
      model: 'gpt-4o',
      max_tokens: 100,
      temperature: 0.9
    }
  };

    console.log(userInput);
    try {
        const response = await axios.request(options);
        console.log(response.data);
        res.render('index',{
            content :  response.data.choices[0].message.content
        })
    } catch (error) {
        console.error(error);
    }
});
  
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
  


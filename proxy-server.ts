const express = require("express");
const cors = require("cors");
const axios = require("axios");
const http = require("http");

const app = express();
const port = 3000;

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);


const router = express.Router();

router.get('/games', async (req: any, res: any) => {
    try {
        const { category, platform  } = req.query;
        let apiUrl = 'https://www.freetogame.com/api/games';

        if (category) {
            const tag = category.split(".");
            if (tag.length > 1) {
              apiUrl = 'https://www.freetogame.com/api/filter';
              apiUrl += `?tag=${category}`;
            } else {
              apiUrl += `?category=${category}`;
            }
        }
        if (platform) {
          apiUrl += `${category ? '&' : '?'}platform=${platform}`;
        }
        console.log(apiUrl);
        const response = await axios.get(apiUrl);
        res.json(response.data)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error get games' });
    }
})


router.get('/game', async (req: any, res: any) => {
  try {
    const { id } = req.query;
    let apiUrl = 'https://www.freetogame.com/api/game';

    if (!id) {
      res.json({error: "id not found"})
      return;
    }

    const params = {id: id}

    const response = await axios.get(apiUrl, {params});
    res.json(response.data)

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error get games' });
  }
})


app.use(cors());
app.use("/api", router);


const server = http.createServer(app);

async function startApp(){
  try {   
      server.listen(port, () => {
          console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
      })
  } catch (e) {
      console.log("error start server");
  }
}

startApp();

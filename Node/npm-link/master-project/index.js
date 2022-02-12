const express = require("express");
const News = require("news");
const Weather = require("weather");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const news = News();
  const weather = Weather();

  res.send(`
  Brisbane
  News: ${news.Today()}
  Weather: ${weather.Today()}
  `);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

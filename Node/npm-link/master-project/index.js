const express = require("express");
const News = require("news");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const news = News();

  res.send(`
  Brisbane
  News: ${news.Today()}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

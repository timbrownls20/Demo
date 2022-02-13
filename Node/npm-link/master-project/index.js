const express = require("express");
const News = require("news");
const Travel = require("travel");
const Weather = require("weather");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const news = News();
  const travel = Travel();
  const weather = Weather();

  res.send(`
  <html>
    <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">\
    </head>
    <body class='container d-flex justify-content-center align-items-center'>
    <div class='card'>
      <div class='p-5'>
         <h2>Brisbane Update </h2>
         <div>News: ${news.Today()} </div>
         <div>Travel: ${travel.Today()} </div>
         <div>Weather: ${weather.Today()} </div>
      </div>
    </body>
  </html>
  `);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

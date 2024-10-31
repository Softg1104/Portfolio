const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const apiKey = "d30f3b76013bcfde9be4b8719a124ccc"; // Replace with your actual API key

app.get("/", (req, res) => {
  res.render("index"); 
});


app.post("/", (req, res) => {
  const cityName = req.body.cityName;
  const units = "metric"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  https.get(url, (response) => {
    if (response.statusCode === 200) {
      let data = "";


      response.on("data", (chunk) => {
        data += chunk;
      });

   
      response.on("end", () => {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;

   
        res.render("result", {
          city: cityName,
          temp: temp,
          description: description,
          icon: icon
        });
      });
    } else {
      res.render("error", { city: cityName });
    }
  }).on("error", (err) => {
    res.render("error", { city: cityName });
  });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

//serving index.html when / directory is accessed
app.get("/", (req, res) => {

    res.sendFile(__dirname + "/index.html");

});

// post request being received and processed
app.post("/", (req, res) => {

    //api endpoint with parameters
    const query = req.body.cityName;
    const unit = "metric"
    const apiKey = "be1f22f189526dda74e3cad711435f36";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey + "";

    //https get method to get the response back from api server
    https.get(url, function (response) {
        console.log(response.statusCode);

        //tapping into the response body
        response.on("data", function (data) {

            //parsing hex data into JS object
            const weatherData = JSON.parse(data);

            //sending back data
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The weather is currently " + desc + ".</h1>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees.</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();


        });
    });


});




app.listen(3000, () => {

    console.log("The server is running on port 3000.");

});
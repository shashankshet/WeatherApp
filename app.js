const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname +"/index.html");
});

app.post("/",function(req,res){

  const query = req.body.cityname;
  const appid = "b6a05daacbca5b10dc65740af4a5a3d4"

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+ "&appid="+appid;
  https.get(url,function(response){
    response.on("data",function(data){
      const weatherData = JSON.parse(data)
      const temp = Math.round((weatherData.main.temp-273.15)*10)/10
      const weatherdescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imgurl = "http://openweathermap.org/img/wn/"+icon+".png"
      const mintemp = Math.round((weatherData.main.temp_min-273.15)*10)/10
      const maxtemp = Math.round((weatherData.main.temp_max-273.15)*10)/10
      const pressure = weatherData.main.pressure
      const humidity = weatherData.main.humidity
      const windspeed = weatherData.wind.speed

      res.write("<h1>The tempareture in "+query+" is " + temp + " degree celsius </h1>");
      res.write("<h3>The weather is currently " + weatherdescription + " </h3>");
      res.write("<h3>Minimum tempareture = "+ mintemp+" degree celcius</h3>");
      res.write("<h3>Maximum tempareture = "+ maxtemp+ " degree celcius</h3>");
      // res.write("<h3>Pressure = "+pressure+ "</h3>");
      res.write("<h3Humidity = "+humidity+"></h3>");
      // res.write("<h3>Wind speed = "+windspeed+"</h3>");
      res.write("<img src=" +imgurl+ ">");
      res.send();
    })
  })


})


app.listen(3000,function(){
  console.log("Server listening at port 3000");
});

const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",(req,res)=>{
   res.sendFile(__dirname +"/index.html"); 
})

app.post("/",(req,res)=>{

    const query = req.body.cityName;
    const apikey = "52228e34cfb818f27f948b2bff44d4b0#";
    const unit ="metric";
    https.get("https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid=" + apikey, (response)=>{
        console.log('statusCode :', response.statusCode);
        console.log('headers :', res.headers);
        console.log(response);

        response.on('data', (d)=>{
        const weatherData = JSON.parse(d);
        const temp = weatherData.main.temp;
        const des = weatherData.weather[0].description;
        const icon = "https://openweathermap.org/img/wn/"+ weatherData.weather[0].icon +"@2x.png"
        res.write("<h1>The temperature in "+ query +" is " + temp + " degrees Celcius.</h1>");
        res.write("<p>The weather is currently" + des + "</p>");
        res.write(`<img src="${icon}">`);
        res.send();
        })
    })

})




app.listen(PORT, ()=>{
    console.log(`App is listening at ${PORT}`)
})
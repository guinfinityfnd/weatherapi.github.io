const https = require('https');
const fs = require('fs');
const express = require('express');
const bodyParsar = require('body-parser');
const { text } = require('body-parser');
const app = new express();
const chalk = require ('chalk');


app.use(bodyParsar.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/api.html');
});

app.post('/',(req,res)=>{
    const cityName = req.body.name;
    console.log(chalk.blue(cityName));
    // const search = "Mandalay";
    const queryApiKey = "214a101d2d4fb18d726345cade1f5bda";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${queryApiKey}&units=metric`;
    https.get(url,(response)=>{
        response.on("data",(data)=>{
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const con = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const img = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(`<h1 style="font-size: 100px; color: red;">The Today Tempture On ${cityName} Is ->${temp}<sup>.</sup>C</h1>`);
            res.write(`<h1 style="font-size: 100px; color: red;">The Today Weather On  ${cityName} Is ->${con}</h1>`);
            res.write(`<img style="width: 300px;background-color:green; margin:0 15% 0 15%" src=${img}>`);
            res.end();
        });        
    });
});

app.listen(4000,()=>{
    console.log("Server is starting......");
})
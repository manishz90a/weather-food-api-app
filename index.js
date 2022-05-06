const serverless = require('serverless-http');
const express = require('express');
const getWeatherInfo = require('./get-weather-info.js');
const { checkJwt } = require("./authz/check-jwt");
const cors = require('cors');

const port = process.env.PORT || '3001';

var app = express();

app.use(express.static(__dirname + '/public'));


var whitelist = ['http://localhost:4200','https://d11h0hbt4zwkx0.cloudfront.net']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors({origin: '*'}));

app.get("/", checkJwt, (req, res) => {
  res.send("Hello Geeks");
});

app.get('/get-weather-info', checkJwt, (req, res) => {
    if (req.query.city) {
        getWeatherInfo.getWeatherInfo(req.query.city).
        then((data)=>{
            res.send(data);
        }, (err) => {
            res.send(err);
        });
    }
});
  
app.listen(port, () => {
console.log('Server is up on port ' + port);
});

module.exports.handler = serverless(app);


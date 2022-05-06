const serverless = require('serverless-http');
const express = require('express');
const getWeatherInfo = require('./get-weather-info.js');
const { checkJwt } = require("./authz/check-jwt");
const cors = require('cors');

const port = process.env.PORT || '3001';

var app = express();

app.use(express.static(__dirname + '/public'));


var whitelist = ['http://localhost:4200', 'https://weather-food-ui-app.s3-website.ap-south-1.amazonaws.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      const response = {
        headers: {
          "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
        }
      };
      callback(null, response)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

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
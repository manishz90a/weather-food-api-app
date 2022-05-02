const axios = require("axios");

function getWeatherInfo (address) {
    var promise = new Promise((resolve, reject) => {

        var geocodeURL ='https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAED7hugOPK3I9Zi_ygU24uoa9f-mpyrMw&address=' + encodeURIComponent(address);

        var output = {};

        axios.get(geocodeURL).then((response) => {
          if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find that address');
          }
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;

        output.lat = lat;
        output.lng = lng;
        output.formattedAddress = response.data.results[0].formatted_address;
        var weatherURL = 'https://api.darksky.net/forecast/fb22c011e733f8ceb47c186fc5010f8d/' + lat + ',' + lng + '?exclude="daily","alerts"';

        return axios.get(weatherURL);

        }).then((response) => {
            console.log(response.data);
          var temp = response.data.currently.temperature;
          var apparentTemperature = response.data.currently.apparentTemperature;
          output.summary = response.data.hourly.summary;
          output.icon = response.data.currently.icon;
          output.temp = temp;
          output.apparentTemperature = apparentTemperature;
          output.nearestStormDistance
          output.humidity = response.data.currently.humidity ? response.data.currently.humidity + " RH" : "Not available";
          output.pressure = response.data.currently.pressure ? response.data.currently.pressure + " millibars" : "Not available";
          output.windSpeed = response.data.currently.windSpeed ? response.data.currently.windSpeed + " MPH" : "Not available";
          output.cloudCover = response.data.currently.cloudCover ? response.data.currently.cloudCover + " okta" : "Not available";
          output.uvIndex = response.data.currently.uvIndex ? response.data.currently.uvIndex : "Not available";
          output.ozone = response.data.currently.ozone ? response.data.currently.ozone + " dobson" : "Not available";
          output.dewPoint = response.data.currently.dewPoint ? response.data.currently.dewPoint + " &#8457" : "Not available";
          output.nearestStormBearing = response.data.currently.nearestStormBearing ? response.data.currently.nearestStormBearing + " degrees" : "Not available";
          output.nearestStormDistance = response.data.currently.nearestStormDistance ? response.data.currently.nearestStormDistance + " miles" : "Not available";
          output.precipAccumulation = response.data.hourly.precipAccumulation ? response.data.hourly.precipAccumulation + " inches" : "Not available";
          output.visibility = response.data.currently.visibility ? response.data.currently.visibility + " miles" : "Not available";
          output.precipType = response.data.currently.precipType ? response.data.currently.precipType : "Not available";
          output.precipProbability = response.data.currently.precipProbability ? response.data.currently.precipProbability : "Not available";
          console.log("output", output);
          resolve(output);
          return output;

        }).catch((e) => {
            output.message = 'Could not get details.';
            reject(output);
        });    
    });
    return promise;    
}

module.exports = {
    getWeatherInfo: getWeatherInfo
}
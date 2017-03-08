const request = require('request');

const getWeather = (latitude, longitude, callback) => {
  request({
    url: `https://api.darksky.net/forecast/1726dc0636227833931e3bd669d1c44a/${latitude},${longitude}?lang=it&units=si`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      //console.log(body);
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature,
        hourlySummary: body.hourly.summary,
        dailySumary: body.daily.summary
      });
    } else {
      callback('Unable to connect to weather server.', undefined);
    }
  });
};

module.exports.getWeather = getWeather;
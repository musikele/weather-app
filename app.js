const request = require('request');

request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=san%20biagio%20dei%20librai%20napoli',
  json: true
}, (error, response, body) => {
  console.log(`Address: ${body.results[0].formatted_address}`);
  console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
  console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
});
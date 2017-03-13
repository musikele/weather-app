const yargs = require('yargs');
const axios = require('axios');

//arguments parsing 
const argv = yargs.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'Address to fetch weather for',
    string: true
  }
}).help()
  .alias('help', 'h')
  .argv;

let encodedAddress = encodeURIComponent(argv.address);

let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl)
  .then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address');
    }
    //console.log(response.data);

    let latitude = response.data.results[0].geometry.location.lat;
    let longitude = response.data.results[0].geometry.location.lng;
    let weatherUrl = `https://api.darksky.net/forecast/1726dc0636227833931e3bd669d1c44a/${latitude},${longitude}?lang=it&units=si`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
  })
  .then((response) => {
    let temperature = response.data.currently.temperature;
    let apparentTemperature = response.data.currently.apparentTemperature;
    let hourlySummary = response.data.hourly.summary;
    let dailySumary = response.data.daily.summary;
    console.log(`Attualmente ci sono ${temperature}°, la temperatura apparente è di ${apparentTemperature}°.`);
    console.log(`Le previsioni per oggi: ${hourlySummary}`);
    console.log(`Le previsioni per questa settimana: ${dailySumary}`);
  })
  .catch((e) => {
    if (e.code === 'ENOTFOUND') {
      console.error('Unable to connect to API servers.');
    } else {
      console.log(e.message);
    }
  });
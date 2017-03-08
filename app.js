
const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

//chiedo a Google di darmi, a partire da un indirizzo, le coordinate geografiche
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  }
  else {
    //Faccio la chiamata a weather.js per avere le previsioni meteo
    weather.getWeather(results.latitude, results.longitude, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Attualmente ci sono ${res.temperature}°, la temperatura apparente è di ${res.apparentTemperature}°.`);
        console.log(`Le previsioni per oggi: ${res.hourlySummary}`);
        console.log(`Le previsioni per questa settimana: ${res.dailySumary}`);
      }
    });
  }
});


const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  }
  else {
    //console.log(JSON.stringify(results, undefined, 2));
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

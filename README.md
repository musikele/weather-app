## Weather App

With this app you can check the meteo from command line. 

### Usage

```console
$ node app.js -a '84083, Italy'
```

| Options | Description | Properties |
| ------- | ----------- | ---------- | 
| -a, --address | Address to fetch weather for | `[stringa]` `[richiesto]` |
| --help, -h    | Mostra la schermata di aiuto | `[booleano]`

### How is it made of 

- `xargs`, to parse command line options 
- `request`, to perform http requests

> Note: this is a simple project I use to learn Node features, following a Nodejs course. You can continue using your favourite widgest to check the meteo. 
const express = require('express');
const app = express();
const helmet = require('helmet');


const timeInSeconds = 90*24*60*60;

app.use(helmet.hidePoweredBy());                              // Hides powered by Express
app.use(helmet.frameguard({action: 'deny'}));                 // Stops clickjacking
app.use(helmet.xssFilter());                                  // Trys to filter out xss attacks
app.use(helmet.noSniff());                                    // Stops sniffing
app.use(helmet.ieNoOpen());                                   // Will not allow IE to open downloads
app.use(helmet.hsts({maxAge: timeInSeconds, force: true}));   // Trys to force broswer to use HTTPS and not HTTP
app.use(helmet.dnsPrefetchControl());                         // Will try and prevent people from looking into dns readings??
app.use(helmet.noCache());                                    // Will try to force the browser to always redownload the site










































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});

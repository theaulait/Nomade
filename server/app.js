const http = require('http');
const express = require('express');
const morgan = require('morgan');
const { urlencoded } = require('body-parser');
const twilio = require('twilio');
const path = require('path');
const app = express();

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(urlencoded({ extended: false }));

// Generate a Twilio Client capability token
app.get('/token', (request, response) => {
  let capability = new twilio.Capability(
    process.env.TWIL_SID,
    process.env.TWIL_TOK
  );
  capability.allowClientOutgoing(process.env.TWIL_APP_SID);
  let token = capability.generate();

  // Include token in a JSON response
  response.send({
    token: token
  });
});

// Create TwiML for outbound calls
app.post('/voice', (request, response) => {
  let twiml = new twilio.TwimlResponse();
  twiml.dial(request.body.number, {
    callerId: process.env.TWIL_NUMBER
  });
  response.type('text/xml');
  response.send(twiml.toString());
});

module.exports = app;

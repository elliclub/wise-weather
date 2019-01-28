const apiKeys = require('./config');
const axios = require('axios')

const express = require('express'),
bodyParser = require('body-parser'),
cors = require('cors'),
app = express(),
cron = require("node-cron");

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 4000;

const url = apiKeys.config.API_URL;

cron.schedule("0 30 07 * * *", function() {
   getData()
    .then(response => {
      sendEmail(response.data)
    });
});


app.get('/weather', (req, res) => {
  getData()
    .then(response => {
      this.data = response.data
      res.send(response.data)
    })
});

function getData() {
  return axios.get('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,se' + url);
}

app.listen(4000, () => console.log('Listening on port 4000'));

const mailKey = apiKeys.config.MAIL_KEY;
const emailAdress = apiKeys.config.EMAIL_KEY;

function sendEmail (data) {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(mailKey);
  const msg = {
    to: `${emailAdress}`,
    from: `${emailAdress}`,
    subject: 'Todays weather',
    text: `The temperature in ${data.name} is ${(data.main.temp - 273.15).toFixed(1)} degrees celsius at the moment, ${data.weather[0].description}.`
  };
  sgMail.send(msg);
}


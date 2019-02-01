const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
var mysql = require('mysql');


app.get('/', (request, response) =>  response.sendFile(`${__dirname}/index.html`)); //get html using express server

app.post('/', (request, response) => { //on form submit use post request
  console.log(request.body);
  console.log(request.body.name);
  response.render(__dirname + "/index.ejs", {result:request.body.name});
});

app.listen(5000, () => console.info('Application running on port 5000'));
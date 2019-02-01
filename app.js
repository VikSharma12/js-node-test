const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
var mysql = require('mysql');
var md5 = require('md5'); //to convert uuid to md5 hash


app.get('/', (request, response) =>  response.sendFile(`${__dirname}/index.html`)); //get html using express server

app.post('/', (request, response) => { //on form submit use post request
  console.log(request.body);
  console.log(request.body.name);
  var x = md5(request.body.name);
  var result = {"uuid":request.body.name, "md5": x}; //result json of uuid and md5 to send to results page

  response.render(__dirname + "/index.ejs", {result:result});
  console.log(md5(request.body.name));

});

app.listen(5000, () => console.info('Application running on port 5000'));
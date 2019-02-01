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
  
  console.log(md5(request.body.name));

  //access db
  var con = mysql.createConnection({
    host: "localhost",
    user: "vikrant.sharms@gmail.com",
    password: "Soccer12.mysql",
    database: "users"
  });

  //connect to db to track number of times uuid been used
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    //query db and update as needed
    var sql = "SELECT number FROM currentUsers " + "WHERE name = '"+request.body.name+"'"; //select uuid 
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
      var c;
      if (result.length >0 ){ //check if uuid exists
        c = parseInt(result[0].number) + 1;
        sql = "UPDATE currentUsers SET number = '"+c+"' WHERE name = '"+request.body.name+"'";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Updated db!" + c);
        });
      } else {
        c = 1;
        sql = "INSERT INTO currentUsers (name, number, website) VALUES ?";
        var values = [
          [request.body.name, c, " "]
        ];
        con.query(sql, [values], function (err, result) {
          if (err) throw err;
          console.log("Updated db!");
        });
      }
      var results = {"uuid":request.body.name, "md5": x, "count": c}; //result json of uuid and md5 to send to results page and count from db
      response.render(__dirname + "/index.ejs", {result:results});

    });
  });

});

app.listen(5000, () => console.info('Application running on port 5000'));
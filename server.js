// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// requirement 01:
app.get("/api/timestamp/:date_string", function (req, res) {
    var data = req.params.date_string;
    json = tratarData(data);
    res.json(json);
});

app.get("/api/timestamp/", function (req, res) {
    var data = req.params.date_string;
    json = tratarData("");
    res.json(json);
});


function tratarData(data){
    var dataTratada;
    if (!data || data == "" || data == undefined){
        dataTratada = new Date();
    } else if(Number.isInteger(data) || !isNaN(data)){
        dataTratada = new Date();
        dataTratada.setTime(data);
    } else if(isValidDate(data)) {
        dataTratada = new Date();
        dataTratada.setTime(Date.parse(data));
    }
    
    var json;
    var isdate = (Object.prototype.toString.call(dataTratada) == '[object Date]');
    
    if(isdate){
        json = {"unix":dataTratada.getTime(), "utc":dataTratada.toUTCString()}
    } else {
        json = {"error" : "Invalid Date" };
    }
    
    return json;
}


/*
Handle: 
2016-12-25
2016-12-25
1482624000000
this-is-not-a-date
retorno: {"unix":1451001600000,"utc":"Fri, 25 Dec 2015 00:00:00 GMT"}
*/

function isValidDate(dateString) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateString.match(regEx)) return false;  // Invalid format
    var d = new Date(dateString);
    var dNum = d.getTime();
    if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0,10) === dateString;
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

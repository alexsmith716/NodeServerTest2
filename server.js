var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var auto = require('./routes/autos');

var MongoClient = require('mongodb').MongoClient;
var dbs;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', auto.getEveryAuto);
app.get('/:id', auto.getOneAuto);
app.post('/', auto.addAuto);
app.put('/:id', auto.updateAuto);
app.delete('/:id', auto.deleteAuto);

// https://www.getcroissant.com/

MongoClient.connect('mongodb://localhost/autosdb', function(err, database) {
    if (err) {
      return console.log('MongoClient.connect > Error!', err);
    }
    dbs = database
    module.exports.db = dbs;
    app.listen(process.env.PORT || 3000, function() {
      console.log('MongoClient.connect > listening on 3000');
    });
    database.collection('autos', {strict:true}, function(err, result) {
        if (err) {
            console.log("The 'autos' collection doesn't exist. Creating it with sample data...");
            populateDB();
        }
        if(result){
            console.log("The 'autos' collection exists. You're good...");
        }
    });
});

var populateDB = function() {
    var autos = [
    {"make":"Honda","model":"Civic","year":"2009","color":"Black","engine":"4cyl"},
    {"make":"Mazda","model":"Miata","year":"2013","color":"Silver","engine":"4cyl"},
    {"make":"Ferrari","model":"Daytona","year":"1968","color":"Blue","engine":"8cyl"},
    {"make":"Toyota","model":"Corolla","year":"2015","color":"Red","engine":"4cyl"}
    ];

    dbs.collection('autos').insert(autos, {safe:true}, function(err, result) {
        if (err) {
          console.log('populateDB > insert > ERROR >', err)
        }
        if (result) {
          console.log('Populating autosdb: ', JSON.stringify(autos));
        }
    });
};

/*
GET All:    curl -i -X GET http://localhost:3000/
GET One:    curl -i -X GET http://localhost:3000/578b7eb5f1294002fb358e00
DELETE:     curl -i -X DELETE http://localhost:3000/578a66cea7d2d8081307a57a
CREATE:     curl -i -X POST -H 'Content-Type: application/json' -d '{"make":"Chevrolet","model":"Chevette","year":"1979","color":"Blue","engine":"4cyl"}' http://localhost:3000/
UPDATE:     curl -i -X PUT -H 'Content-Type: application/json' -d '{"make":"Jeep","model":"Renegade","year":"1986","color":"Green","engine":"6cyl"}' http://localhost:3000/578b7eb5f1294002fb358e00

{"make":"Chevrolet","model":"Chevette","year":"1979","color":"Blue","engine":"4cyl"}
*/

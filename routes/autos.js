
var varDB = require('../server.js');

exports.getEveryAuto = function(req, res) {
  varDB.db.collection('autos').find().toArray(function(err, result) {
    if (err) {
      console.log('getEveryAuto > find > ERROR >', err)
    }
    if (result) {
      res.send(result);
    }
  });
};

exports.getOneAuto = function(req, res) {
  var ObjectId = require('mongodb').ObjectID;
  varDB.db.collection('autos').findOne({"_id": new ObjectId(req.params.id)}, function(err, result) {
    if (err) {
      console.log('getOneAuto > findOne > ERROR >', err)
    }
    if (result) {
      res.send(result)
    }
  });
};

exports.addAuto = function(req, res) {
  /* varDB.db.collection('autos').save(req.body, function(err, result) */
  varDB.db.collection('autos').insert(req.body, {safe:true}, function(err, result) {
    if (err) {
      console.log('addAuto > insert > ERROR >', err)
    }
    if (result) {
      console.log('Adding auto: ', JSON.stringify(req.body));
      res.send(result)
    }
  });
};

exports.updateAuto = function(req, res) {
  var ObjectId = require('mongodb').ObjectID;
  varDB.db.collection('autos').findOneAndUpdate({"_id": new ObjectId(req.params.id)}, req.body, {safe:true}, function(err, result) {
    if (err) {
      console.log('updateAuto > findOneAndUpdate > ERROR >', err)
    }
    if (result) {
      console.log('Udating auto: ', JSON.stringify(req.body));
      res.send(result)
    }
  });
};


exports.deleteAuto = function(req, res) {
  var ObjectId = require('mongodb').ObjectID;
  varDB.db.collection('autos').findOneAndDelete({"_id": new ObjectId(req.params.id)}, function(err, result) {
    if (err) {
      console.log('deleteAuto > findOneAndDelete > ERROR >', err)
    }
    if (result) {
      res.send('Auto deleted...')
    }
  });
};

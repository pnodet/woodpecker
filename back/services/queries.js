import mongo from 'mongodb';
import config from '../config.js';

const url = config.db.url || 'mongodb://localhost:27017/mydb';

export const createDB = () => {
  mongo.MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
      if (err) throw err;
      console.log('oK')
      db.close();
    }
  );
  return true
};

export const createCollection = () => {
  mongo.MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
      if (err) throw err;
      var dbo = db.db('mydb');
      dbo.createCollection('customers', function (err, res) {
        if (err) throw err;
        console.log('Collection created!');
        db.close();
      });
    }
  );
  return true;
};

export const insertOne = () => {
  mongo.MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
    if (err) throw err;
    var dbo = db.db('mydb');
    var myobj = {name: 'Company Inc', address: 'Highway 37'};
    dbo.collection('customers').insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log('1 document inserted');
      db.close();
    });
  });
}

export const insertMany = () => {
  mongo.MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
    if (err) throw err;
    var dbo = db.db('mydb');
    var myobj = [
      {_id: 154, name: 'Chocolate Heaven'},
      {_id: 155, name: 'Tasty Lemon'},
      {_id: 156, name: 'Vanilla Dream'},
    ];
    dbo.collection('customers').insertMany(myobj, function (err, res) {
      if (err) throw err;
      console.log('Number of documents inserted: ' + res.insertedCount);
      db.close();
    });
  });
}

export const findOne = () => {
  mongo.MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("customers").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });
}

export const find = () => {
  mongo.MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("customers").find({}, { projection: { _id: 0, name: 1, address: 1 } }).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });
}

export const empty = () => {
  mongo.MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
    if (err) throw err;

  });
}
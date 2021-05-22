import mongo from 'mongodb';
import config from '../config.js';

const url = config.db.url 

export const createDB = () => {
  mongo.MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
      if (err) throw err;
      console.log('oK')
      db.close();
    }
  );
  return true
};

export const createCollection = (collec) => {
  mongo.MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
      if (err) throw err;
      var dbo = db.db('woodpecker-db');
      dbo.createCollection(collec, function (err, res) {
        if (err) throw err;
        console.log('Collection ' + collec +' created!');
        db.close();
      });
    }
  );
  return true;
};

export const insertOne = (doc, collec) => {
  mongo.MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
    if (err) throw err;
    var dbo = db.db('woodpecker-db');
    dbo.collection(collec).insertOne(doc, function (err, res) {
      if (err) throw err;
      console.log('1 document inserted');
      db.close();
    });
  });
}

export const insertMany = (arr, collec) => {
  mongo.MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
    if (err) throw err;
    var dbo = db.db('woodpecker-db');
    dbo.collection(collec).insertMany(arr, function (err, res) {
      if (err) throw err;
      console.log('Number of documents inserted: ' + res.insertedCount);
      db.close();
    });
  });
}

export const findOne = (itemQuery, collec) => {
  mongo.MongoClient.connect(url, {useUnifiedTopology: true}, async function (err, db) {
    if (err) throw err;
    var dbo = db.db('woodpecker-db');
    const result = dbo
      .collection(collec)
      .find(itemQuery)
    const response = await result.toArray();
    console.log(response);
    db.close()
  });
}

export const find = (collec) => {
  mongo.MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
    if (err) throw err;
    var dbo = db.db('woodpecker-db');
    dbo.collection(collec).find({}, { projection: { _id: 0, name: 1, address: 1 } }).toArray(function(err, result) {
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

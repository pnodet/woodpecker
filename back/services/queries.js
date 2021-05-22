import mongo from 'mongodb';
import config from '../config.js';

const url = config.db.url;

export const createDB = async () => {
  const client = new mongo.MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    console.log('Database created!');
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
  return true;
};

export const createCollection = async collec => {
  const client = new mongo.MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const database = client.db('woodpecker-db');
    const collection = database.createCollection(collec);
    console.log('Collection ' + collec + ' created!');
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
  return true;
};

export const insertOne = async (doc, collec) => {
  const client = new mongo.MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const database = client.db('woodpecker-db');
    const collection = database.collection(collec);
    const result = await collection.insertOne(doc);
    console.log(
      `${result.insertedCount} document was inserted with the _id: ${result.insertedId}`
    );
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

export const insertMany = async (arr, collec) => {
  const client = new mongo.MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const database = client.db('woodpecker-db');
    const collection = database.collection(collec);
    const result = await collection.insertMany(arr);
    console.log(
      `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`
    );
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

export const findOne = async (itemQuery, collec) => {
  const client = new mongo.MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const database = client.db('woodpecker-db');
    const collection = database.collection(collec);
    const options = {};
    const cursor = collection.find(itemQuery, options);
    if ((await cursor.count()) === 0) {
      console.log('Document not found!');
    }
    const response = await cursor.toArray();
    return response;
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

export const find = async (collec, options) => {
  const client = new mongo.MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const database = client.db('woodpecker-db');
    const collection = database.collection(collec);
    const cursor = collection.find(itemQuery, options);
    if ((await cursor.count()) === 0) {
      console.log('Documents not found!');
    }
    const response = await cursor.toArray();
    return response;
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

export const empty = async () => {
  const client = new mongo.MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

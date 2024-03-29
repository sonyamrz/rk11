const { ObjectId } = require("mongodb");
const connectToMongoDB = require("../configs/config.js");

let db;

connectToMongoDB() //пример промиса
  .then((result) => {
    db = result;
  })
  .catch((err) => console.log(err));

console.log(db);

async function insertComment(data) {
  const comments = db.collection("comments");
  await comments.insertOne(data);
}

async function findComments() {
  const comments = db.collection("comments");
  const result = await comments.find();
  return result.toArray();
}

async function findComment(id) {
  const comments = db.collection("comments");
  const result = await comments.findOne({ _id: new ObjectId(id) });
  return result;
}

async function findName(name) {
  const comments = db.collection("comments");
  const result = await comments.findOne({ name });
  return result;
}

module.exports = {
  insertComment,
  findComments,
  findComment,
  findName,
};
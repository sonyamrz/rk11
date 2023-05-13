const commentServices = require('../services/service');
const { ObjectId } = require('mongodb');

async function getAllComments(req, res) {
  let allComments = await commentServices.findComments()
  res.json(allComments)
}controllers/controller.js

async function getComment(req, res) {
  if (ObjectId.isValid(req.params.id)) {
    let priority = await commentServices.findComment(req.params.id)
    res.json(priority)
  } else {
    res.status(404).send("Object Not Found1")
  }
}

function postAddComments(req, res) {
  const { name, priority, material } = req.body;
  commentServices.insertComment({ name, priority, material });
  res.json()
}

async function getOrderByName (req, res) {
    const value = req.query.value;
    let comment = await commentServices.findName(value);
    if (comment){
      res.json(comment);
    }
    else {
        res.status(404).send("Object Not Found2");
    }
}

module.exports = {
  getAllComments,
  postAddComments,
  getComment,
  getOrderByName,
}
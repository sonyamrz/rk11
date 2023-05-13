const express = require("express");
const router = express.Router();
const morgan = require("morgan");
const helmet = require("helmet");



const jsonParser = express.json();

const commentsController = require("../controllers/controller");

function CheckAuthorization(req, res, next){
    const apiKey = req.query.apiKey;
    if (apiKey !== 'secret'){
        res.status(401).send('Ошибка авторизации');
    }
    else {
        next();
    }
}

const user = {name: "sonya", email: "sofaelison@gmail.com"};

router.get('/', (req, res) => {

    res.send('Hello World!');
   
})

//для бд
router.get("/allOrders", commentsController.getAllComments);
router.get("/orders/:id", commentsController.getComment);
router.post("/orders", express.json(), commentsController.postAddComments);
router.get("/orders", commentsController.getCommentByName);


function CheckLogin(req,res,next){
    if (req.body.name == user.name){
        next();
    } else {
        res.send("Неправильный логин");
    }
}

function CheckComments(req,res,next){
    if (!req.body.name){
        res.send("Пустое тело");
    } else {
        next();
    }
}

router.post('/login', jsonParser, CheckLogin, (req,res) => {
    res.status(228).send(`Welcome, ${user.name}`);
})

router.post('/comments', jsonParser, CheckComments, (req, res) => {
    comments.push(req.body);
    res.status(200).json(comments);
  
})

router.post('/authorization', CheckAuthorization, (req,res) => {
    res.status(215).send("Авторизация пройдена");
})

router.use((req, res) => {
    res.status(400).send('Данная страница не найдена!');
})

router.use((err, req,res) => {
    res.status(500).send('Ошибка сервера')
})
router.use((req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send("Неверные данные");
})

module.exports = router;

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const RestAPI = require("./routes/rout");
const dbAPI = require("./controllers/controller")

const hostname = '127.0.0.1';
const port = 5500;

const app = express();

const logger = morgan('combined'); 
app.use(logger);


app.use(helmet());


app.use(express.static('public'));
app.use('/routes', RestAPI);



app.use((req, res) => {
    res.status(404).send('Данная страница не найдена!');
})

app.use((err, req, res) => {
    res.status(500).send('Ошибка сервера')
})

app.listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`)
})
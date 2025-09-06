const dotenv = require('dotenv').config();
const express = require("express");
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const session = require('express-session')

const cookieParser = require('cookie-parser')

const port = process.env.PORT;
const database = require('./config/database');
// create application/json parser
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3001', // Chỉ cho phép origin này truy cập
  credentials: true                // Cho phép gửi cookie
}));
app.use(cookieParser())

app.use(cookieParser('HGLKHGIOG')); // Sử dụng cookieParser đã import
app.use(session({
  secret: 'HGLKHGIOG',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: true
}));
const routesApiver1= require('./api/v1/routes/index.route');
database.connect();
//Routes version 1
routesApiver1(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

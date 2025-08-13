const dotenv = require('dotenv').config();
const express = require("express");
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')

const port = process.env.PORT;
const database = require('./config/database');
// create application/json parser
app.use(bodyParser.json());
app.use(cors());
const routesApiver1= require('./api/v1/routes/index.route');
database.connect();
//Routes version 1
routesApiver1(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

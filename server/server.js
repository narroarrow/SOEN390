const jwt = require('jsonwebtoken');
const express = require('express');
const app = require('./app.js');
const path = require('path');
const bodyParser = require('body-parser')
let db = require('./database')
const mysql = require("mysql2");
const cors = require('cors');
const bcrypt = require('bcrypt')
var cookieParser = require('cookie-parser')
const UserController = require("./UserController");
require('dotenv').config()




app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));



const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();

//Use of CORS middleware
app.use(cors());

//Reading and parsing body
app.use(express.json());

dbConnection();

//Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));

app.listen(3333, () => {
  console.log('Server is running on port 3333');
});
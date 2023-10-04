// Server logical //
const express = require('express');
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// Enviroment variables //
app.set('port', process.env.PORT || 4000);
app.use(morgan('dev'));

app.use(cors())
app.use(express.json()); // To API understand JSON
app.use(express.urlencoded({ extended: false}));
app.use("/api/employees",require('./routes/employees.routes'));

module.exports = app;

const consign = require('consign');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');

require("dotenv").config();

// Configurando timezone padrão
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('America/Sao_Paulo');

const app = express();

app.use(express.json());
app.use(cors());

// Logs de requests
app.use(morgan(':method | :url | :status | :response-time ms | :date[clf]'));

consign()
    .include('./src/config/routes.js')
    .into(app);

module.exports = app;

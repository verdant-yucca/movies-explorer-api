require('dotenv').config();

const { NODE_ENV, MONGO_PROD } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cors = require('./middlewares/cors');
const centralizedError = require('./middlewares/centralizedError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/routes');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect(NODE_ENV === 'production' ? MONGO_PROD : 'mongodb://localhost:27017/moviesdb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(cors);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(centralizedError);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

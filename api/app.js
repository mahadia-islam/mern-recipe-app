const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// INTERNAL IMPORTS

const { notFoundHandler, errorHandler } = require('./middleware/default/errorHandlers');
const userRouter = require('./routes/userRouter');
const recipeRouter = require('./routes/recipeRouter');
const peopleRouter = require('./routes/peopleRouter');

// express app

const app = express();
dotenv.config();
app.use(cors({ origin: true, credentials: true }));

// database connection

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => console.log('database connection successfull'))
    .catch((err) => console.log(err));


// request parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser

app.use(cookieParser(process.env.COOKIE_SECRET));

// routes

app.use('/users', userRouter);
app.use('/recipes', recipeRouter);
app.use('/peoples', peopleRouter);

// error handler

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
})
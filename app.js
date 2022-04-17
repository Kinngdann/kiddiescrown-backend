const express = require('express');
const cors = require('cors');
const dbConn = require('./config/dbConfig');

// Routes
const userRouter = require('./Routes/userRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Mounting Router
app.use('/api/user', userRouter);

dbConn();

module.exports = app;

const express = require('express');
const cors = require('cors');
const dbConn = require('./config/dbConfig');

// Routes
const userRouter = require('./Routes/userRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.use((req, res, next) => {
    const allowedOrigins = ['https://www.kiddiescrown.com', 'https://kiddiescrown.com', 'http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

// Mounting Router
app.use('/api/user', userRouter);

dbConn();

module.exports = app;

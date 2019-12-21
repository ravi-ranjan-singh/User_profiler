const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const globalErrorHandler = require('./controllers/errorController');
const app = express();


// use it before all route definitions
app.use(cors({origin: 'http://localhost:3000'}));

app.use(express.json({ limit: '10kb' }));

app.use('/user', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

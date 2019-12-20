const express = require('express');
const userRouter = require('./routes/userRouter');
const globalErrorHandler = require('./controllers/errorController');
const app = express();
app.use(express.json({ limit: '10kb' }));

app.use('/user', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

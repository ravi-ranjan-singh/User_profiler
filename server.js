const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const app = require('./app');

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Database Connection Successful');
  });

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`server is running on PORT : ${PORT}`);
});

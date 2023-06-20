const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

require('express-async-errors');

const express = require('express');
const app = express();

const mainRoutes = require('./routes/mainRoutes');

const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./db/connect');

// middleware
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1', mainRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
    // await connectDB;
    // console.log('DB connection successful!');
  } catch (error) {
    console.log(error);
  }
};

start();

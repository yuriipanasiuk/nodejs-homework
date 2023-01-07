const mongoose = require('mongoose');

const app = require('./app');

const { PORT, DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(
    app.listen(PORT, () => {
      console.log(`Database connection successful`);
    })
  )
  .catch(err => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });

import app from './app';

import mongoose from 'mongoose';
import env from './utils/validateEnv';

const DB_URI = env.MONGO_URI;
const PORT = env.PORT;

mongoose
  .connect(`${DB_URI}`)
  .then((conn) => {
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    app.listen(PORT, () => {
      console.log(`Server running...`);
    });
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });

import dotenv from 'dotenv';
import app from './app';
import { syncDatabase } from './models';

dotenv.config();

const port = process.env.PORT || 3000;

syncDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
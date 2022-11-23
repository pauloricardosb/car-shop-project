import 'dotenv/config';
import app from './app';
import connectToDatabase from './Models/Connection';

const PORT = process.env.PORT || 3001;
connectToDatabase()
  .then(() => {
    // eslint-disable-next-line no-console
    app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));
  })
  .catch((error) => {
    error(error);
    process.exit(0);
  });

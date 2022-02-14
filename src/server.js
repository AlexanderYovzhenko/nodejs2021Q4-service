const { PORT } = require('./common/config');
const app = require('./app');

// Run the server!
const startServer = async () => {
  try {
    await app.listen(PORT, () => console.info(`App is running on http://localhost:${PORT}`));
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

startServer();
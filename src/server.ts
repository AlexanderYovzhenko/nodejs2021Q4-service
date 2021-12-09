const { PORT } = require('./common/config');
const server = require('./app');

// Run the server!
const startServer = async () => {
  try {
    await server.listen(PORT, () =>
      console.info(`App is running on http://localhost:${PORT}`)
    );
  } catch (err: unknown) {
    server.log.error(err);
    process.exit(1);
  }
};

startServer();

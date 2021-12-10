const { PORT } = require('./common/config');
const server = require('./app');

/**
 * Run the server!
 * Listening on a port and displaying a message in the log.
 * If error then exit process and displaying a message about error in the log.
 * @returns void
 */
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

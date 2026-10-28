import 'dotenv/config';
import app from './app.js';

const port = Number(process.env.PORT || 5000);
const server = app.listen(port, () => {
  console.info(`StaffSync API listening on http://localhost:${port}`);
});

function shutdown(signal) {
  console.info(`${signal} received; shutting down StaffSync API...`);
  server.close((error) => {
    if (error) {
      console.error('Error while closing the HTTP server.', error);
      process.exitCode = 1;
    }
    process.exit();
  });
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

const app = require("./app");
const env = require("./config/env");
const prisma = require("./config/prisma");

const startServer = async () => {
  try {
    await prisma.$connect();
    app.listen(env.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port ${env.port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();

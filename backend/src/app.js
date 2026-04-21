const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const apiRateLimit = require("./middlewares/rateLimit.middleware");
const errorMiddleware = require("./middlewares/error.middleware");
const routes = require("./routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(apiRateLimit);
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.use("/api", routes);

const frontendDistPath = path.resolve(__dirname, "../../frontend/dist");
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

app.use((req, res) => {
  res.status(404).json({
    success: false,
    data: null,
    message: "Route not found",
  });
});

app.use(errorMiddleware);

module.exports = app;

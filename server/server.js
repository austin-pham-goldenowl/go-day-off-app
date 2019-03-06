require("@babel/register")({
  presets: ["@babel/preset-env"]
});
require("@babel/polyfill");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const errorHandler = require("errorhandler");
const express = require("express");
const expressValidator = require("express-validator");
const methodOverride = require("method-override");
const morgan = require("morgan");

/**
 * Load environment variables from .env file,
 * where API keys and passwords are configured.
 */
dotenv.load({ path: ".env.dev" });

/**
 * Declaring express server
 */
const server = express();
server.set("port", process.env.SERVER_HOST_PORT || 3001);
server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(methodOverride("X-HTTP-Method-Override"));
server.use(expressValidator());
server.use(cors());

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === "development") {
  // only use in development
  server.use(errorHandler());
} else {
  server.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Server Error");
  });
}

/**
 * Middlewares/Helpers
 */
const { verifyAccToken } = require("./helpers/jwt");

/**
 * Controllers
 */
const authCtrl = require("./controllers/auth");
server.use("/api/auth", authCtrl);
// ---
const userCtrl = require("./controllers/user");
server.use("/api/user", verifyAccToken, userCtrl);
// ---
const leaveLetterCtrl = require("./controllers/leaveLetter");
server.use("/api/leaveLetter", verifyAccToken, leaveLetterCtrl);
// ---
const absenceCtrl = require("./controllers/absence");
server.use("/api/absenceType", verifyAccToken, absenceCtrl);
const teamCtrl = require("./controllers/team");
server.use("/api/team", verifyAccToken, teamCtrl);

/**
 * Start Express server
 */
server.listen(server.get("port"), () => {
  console.log(
    `[GO-LeavingForm] Express server is running at http://localhost:${server.get(
      "port"
    )}`
  );
});

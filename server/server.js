/**
 * Enable ES6 syntax
 */
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
const authCtrl = require("./controllers/v1.0.0/auth");
server.use("/api/v1.0.0/auth", authCtrl);
// ---
const userCtrl = require("./controllers/v1.0.0/user");
server.use("/api/v1.0.0/user", verifyAccToken, userCtrl);
// ---
const leaveLetterCtrl = require("./controllers/v1.0.0/leaveLetter");
server.use("/api/v1.0.0/leaveLetter", verifyAccToken, leaveLetterCtrl);
// ---
const absenceCtrl = require("./controllers/v1.0.0/absence");
server.use("/api/v1.0.0/absenceType", verifyAccToken, absenceCtrl);
// --
const teamCtrl = require("./controllers/v1.0.0/team");
server.use("/api/v1.0.0/team", verifyAccToken, teamCtrl);
// --
const positionCtrl = require("./controllers/v1.0.0/position");
server.use("/api/v1.0.0/position", verifyAccToken, positionCtrl);
// --
const rejectCtrl = require("./controllers/v1.0.0/reject");
server.use("/api/v1.0.0/reject", verifyAccToken, rejectCtrl);

/**
 * Start Express server
 */
server.listen(server.get("port"), () => {
  console.log(`[GO-LeavingForm] Express server is running at http://localhost:${server.get("port")}`);
});

import rndToken from "rand-token";
import jwt from "jsonwebtoken";

/**
 * Configs
 */
import { AUTH_CONFIG } from "../configs/config";

export const genRefToken = () => rndToken.generate(AUTH_CONFIG.REF_TOKEN_SIZE);

export const verifyAccToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (token) {
    jwt.verify(token, AUTH_CONFIG.SECRET, (err, payload) => {
      if (err) {
        const msg =
          err.name === "TokenExpiredError" ? "EXPIRED_TOKEN" : "INVALID_TOKEN";
        handleFailure(res, { code: 401, msg });
      } else {
        req.token_payload = payload;
        next();
      }
    });
  } else {
    handleFailure(res, { code: 403, msg: "NO_TOKEN" });
  }
};

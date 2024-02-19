import jwt from "jsonwebtoken";
import { InternalServerError, UnAuthenticatedError } from "../errors/index.js";
import client from "./init_redis.js";

const signAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {},
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_LIFETIME,
        audience: userId,
      },
      (err, token) => {
        if (err) {
          reject(new InternalServerError(err.message));
        }
        resolve(token);
      }
    );
  });
};

const signRefreshToken = (userId) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {},
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_LIFETIME,
        audience: userId,
      },
      (err, token) => {
        if (err) {
          reject(new InternalServerError(err.message));
        }
        client.SET(userId, token, "EX", 365 * 24 * 60 * 60, (err, reply) => {
          if (err) {
            reject(new InternalServerError(err.message));
            return;
          }
          resolve(token);
        });
      }
    );
  });
};

const verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, payload) => {
        if (err) return reject(new UnAuthenticatedError());
        const userId = payload.aud;
        client.GET(userId, (err, result) => {
          if (err) {
            console.log(err.message);
            reject(new InternalServerError());
            return;
          }
          if (refreshToken === result) return resolve(userId);
          reject(new InternalServerError());
        });
      }
    );
  });
};

const verifyAccessToken = (req, res, next) => {

  if (!req.headers["authorization"]) return next(new UnAuthenticatedError());
  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      const message =
        err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
      return next(new UnAuthenticatedError(message));
    }
    req.payload = payload;
    next();
  });
};

export {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
};

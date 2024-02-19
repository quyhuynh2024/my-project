import User from "../models/User.js";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../helpers/jwt_helper.js";
import client from "../helpers/init_redis.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("please provide all values");
  }

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }

  const user = await User.create({ name, email, password });

  const accessToken = await signAccessToken(user.id);
  const refreshToken = await signRefreshToken(user.id);

  res.send({ accessToken, refreshToken });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError("user not registered");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("email/password not valid");
  }

  const accessToken = await signAccessToken(user.id);
  const refreshToken = await signRefreshToken(user.id);

  res.send({ accessToken, refreshToken });
};

const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;
  if (!refreshToken) throw new BadRequestError("token does not exist");
  const userId = await verifyRefreshToken(refreshToken);

  const accessToken = await signAccessToken(userId);
  const refToken = await signRefreshToken(userId);

  res.send({ accessToken: accessToken, refreshToken: refToken });
};

const logout = async (req, res, next) => {
  const { refreshToken } = req.body;
  if (!refreshToken) throw new BadRequestError();
  const userId = await verifyRefreshToken(refreshToken);
  client.DEL(userId, (err, val) => {
    if (err) {
      throw new InternalServerError();
    }
    console.log(val);
    res.sendStatus(204);
  });
};

export { register, login, refreshToken, logout };

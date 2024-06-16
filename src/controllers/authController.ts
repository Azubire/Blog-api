import { Request, Response, Next } from "restify";
import { User } from "../database/models/user";
import logger from "../utils/logger";
import { HTTPStatusCode } from "../../shared/enums/http";
import { getUserByUserName } from "../../services/auth/authService";
import { SessionData } from "express-session";

export const signup = async (req: Request, res: Response, next: Next) => {
  try {
    //check if user already exists
    const existingUser = await getUserByUserName(req.body.userName);

    if (existingUser) {
      logger.error(`User: ${existingUser.email} already exists`, {
        service: "User signup",
      });
      res.status(HTTPStatusCode.Conflict);
      throw new Error("User already exists");
    }

    //new user proceed
    const user = await User.create({
      ...req.body,
      role: "user",
    });
    logger.info(`User: ${user.email} created successfully`, {
      service: "User signup",
    });

    //send Welcome mail

    res.status(HTTPStatusCode.Created);
    res.json({
      success: true,
      message: "User created successfully",
    });

    next();
  } catch (error) {
    next(error);
  }
};

export const signin = async (
  req: Request & { session: any },
  res: Response,
  next: Next
) => {
  try {
    //try finding user
    const user = await User.findOne({ email: req.body.email }).select([
      "+password",
    ]);

    if (!user) {
      logger.error(`User: ${req.body.email} not found`, {
        service: "User login",
      });
      res.status(HTTPStatusCode.NotFound);
      throw new Error(`Incorrect credentials`);
    }

    const isMatch = await user.comparePassword(req.body.password);

    if (!isMatch) {
      logger.error(`Incorrect password for user: ${req.body.email}`, {
        service: "User login",
      });
      res.status(HTTPStatusCode.BadRequest);
      throw new Error("Incorrect credentials");
    }

    logger.info(`User: ${user.email} logged in successfully`, {
      service: "User login",
    });

    req.session.regenerate(function (err: any) {
      if (err) throw new Error(err);
    });

    req.session.user = {
      _id: user._id,
      userName: user.userName,
      email: user.email,
      role: user.role,
    };

    req.session.save(function (err: any) {
      if (err) throw new Error(err);
    });

    res.json({
      success: true,
      message: "logged in successfully",
    });
    logger.info({
      session: req.session,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (
  req: Request & { session: any },
  res: Response,
  next: Next
) => {
  try {
    req.session.user = null;
    req.session.destroy((err: any) => {
      if (err) {
        throw new Error(err);
      }
    });

    res.json({
      success: true,
      message: "logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

import { Request, Response, Next } from "restify";
import { User } from "../database/models/user";
import logger from "../utils/logger";
import { HTTPStatusCode } from "../../shared/enums/http";
import { getUserByUserName } from "../../services/auth/authService";

export const register = async (req: Request, res: Response, next: Next) => {
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

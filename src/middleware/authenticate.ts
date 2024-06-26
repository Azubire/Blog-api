import { Next, Request, Response } from "restify";
import logger from "../utils/logger";
import { HTTPStatusCode } from "../shared/enums/http";

export const authenticate = async (
  req: Request & { session: any; user: any },
  res: Response,
  next: Next
) => {
  try {
    const user = req.session.user;

    if (!user) {
      logger.error("user not found");
      res.status(HTTPStatusCode.NotFound);
      throw new Error("User not authenticated");
    }

    req.user = user;
  } catch (error) {
    next(error);
  }
};

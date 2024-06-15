import { Request, Response, Next } from "restify";
import router from "restify-router";

import authRouter from "./auth";

const api = new router.Router();

api.get("/", (req: Request, res: Response, next: Next) => {
  res.status(200);
  res.json({
    success: true,
    message: "Welcome to Syncline Blog API v1.0.0 ⚡⚡⚡",
  });
  next();
});

// auth routes
api.add("/auth", authRouter);

// post routes
api.add("/posts", authRouter);

// admin routes
api.add("/admin", authRouter);

export default api;

import { Request, Response, Next } from "restify";
import router from "restify-router";

import authRouter from "./auth";
import postRouter from "./posts";
import categoryRouter from "./posts/category";

import { authenticate } from "../middleware/authenticate";
import { getUserPosts } from "../controllers/postController";

const api = new router.Router();

api.get("/", authenticate, (req: Request, res: Response, next: Next) => {
  res.status(200);
  res.json({
    success: true,
    message: "Welcome to Syncline Blog API v1.0.0 ⚡⚡⚡",
  });
});

// auth routes
api.add("/auth", authRouter);

// category routes
api.add("/categories", categoryRouter);

api.get("/author-posts", getUserPosts);

// post routes
api.add("/posts", postRouter);

// admin routes
api.add("/admin", authRouter);

export default api;

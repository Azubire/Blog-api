import { Next, Request, Response } from "restify";
import router from "restify-router";

const auth = new router.Router();

auth.post("/login", (req: Request, res: Response, next: Next) => {
  res.send("Hello login page");

  next();
});

auth.post("/register", (req: Request, res: Response, next: Next) => {
  res.send("Hello register page");

  next();
});

export default auth;

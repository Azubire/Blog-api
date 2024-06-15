import { Next, Request, Response } from "restify";
import router from "restify-router";
import { register } from "../../controllers/authController";

const auth = new router.Router();

auth.post("/login", (req: Request, res: Response, next: Next) => {
  res.send("Hello login page");

  next();
});

auth.post("/register", register);

export default auth;

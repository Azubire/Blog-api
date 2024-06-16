import router from "restify-router";
import { logout, signin, signup } from "../../controllers/authController";
import { validate } from "../../middleware/validate";
import { authenticate } from "../../middleware/authenticate";

const auth = new router.Router();

auth.post("/signin", validate("auth/signin"), signin);

auth.post("/signup", validate("auth/signup"), signup);

auth.get("/logout", authenticate, logout);

export default auth;

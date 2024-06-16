import router from "restify-router";
import { signin, signup } from "../../controllers/authController";
import { validate } from "../../middleware/validate";

const auth = new router.Router();

auth.post("/signin", validate("auth/signin"), signin);

auth.post("/signup", validate("auth/signup"), signup);

export default auth;

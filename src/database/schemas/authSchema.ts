import Joi from "joi";
import { IAuthSignup } from "../../interfaces/user";

const authSignup = Joi.object<IAuthSignup>({
  userName: Joi.string().required().label("username"),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
});

export default {
  "admin/auth/signup": authSignup,
};

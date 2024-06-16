import Joi from "joi";
import { IAuthLogin, IAuthSignup } from "../../interfaces/user";

const authSignup = Joi.object<IAuthSignup>({
  userName: Joi.string().required().label("username"),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
});

const authLogin = Joi.object<IAuthLogin>({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
});

export default {
  "auth/signup": authSignup,
  "auth/signin": authLogin,
};

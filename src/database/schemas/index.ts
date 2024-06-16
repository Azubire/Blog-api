import authSchema from "./authSchema";
import postSchema from "./postSchema";

export const schemas = {
  ...authSchema,
  ...postSchema,
};

export type TSchema = keyof typeof schemas;

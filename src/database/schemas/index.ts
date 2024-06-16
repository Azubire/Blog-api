import authSchema from "./authSchema";

export const schemas = {
  ...authSchema,
};

export type TSchema = keyof typeof schemas;

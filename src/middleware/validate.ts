import { Next, Request, Response } from "restify";
import { TSchema, schemas } from "../database/schemas/index";
import Errors from "restify-errors";
import { HTTPStatusCode } from "../../shared/enums/http";

const allowedMethods = ["post", "put", "patch", "delete"];
const options = {
  abortEarly: false, // include all errors
  allowUnknown: false, // allow unknown properties
  stripUnknown: true, // remove unknown properties
};

export const validate =
  (route: TSchema) => (req: Request, res: Response, next: Next) => {
    const method = req?.method?.toLowerCase();

    if (method && !allowedMethods.includes(method)) {
      return next();
    }

    const schema = schemas[route];

    if (!schema) {
      const error = new Error(`Schema not found for ${route}`);
      return next(error);
    }

    const { error, value } = schema.validate(req.body, options);

    if (error) {
      const message = error.details.map(({ message, path, type }) => ({
        message: message.replace(/"/g, ""),
        path: path[0],
      }));

      return next(
        new Errors.UnprocessableEntityError(
          {
            message: message,
          },
          "Validation Error"
        )
      );
    }

    req.body = value;

    return next();
  };

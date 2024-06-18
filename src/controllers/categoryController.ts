import { Next, Request, Response } from "restify";
import { Category } from "../database/models/category";
import logger from "../utils/logger";

export const getCategories = async (
  req: Request,
  res: Response,
  next: Next
) => {
  try {
    const categories = await Category.find();
    res.json({
      success: true,
      message: "Categories fetched successfully",
      data:categories,
    });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: Next
) => {
  logger.info({
    body: req.body,
  });
  try {
    const category = await Category.create({
      name: req.body.name,
    });

    res.send({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    logger.info({
      error: error,
    });
    return next(error);
  }
};

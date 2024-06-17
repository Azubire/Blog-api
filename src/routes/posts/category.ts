import router from "restify-router";
import { authenticate } from "../../middleware/authenticate";
import {
  createCategory,
  getCategories,
} from "../../controllers/categoryController";

const category = new router.Router();

category.get("/", getCategories);
category.post("/", authenticate, createCategory);

export default category;

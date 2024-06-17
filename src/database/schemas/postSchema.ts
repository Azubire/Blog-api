import Joi, { PartialSchemaMap } from "joi";
import { IPost } from "../../interfaces/post";

const createPost = Joi.object<PartialSchemaMap<IPost>>({
  title: Joi.string().required().label("title"),
  content: Joi.string().required().label("content"),
  category: Joi.string().required().label("category"),
  tags: Joi.array().label("tags"),
  meta: Joi.object<IPost["meta"]>().label("meta"),
});
const updatePost = Joi.object<PartialSchemaMap<IPost>>({
  title: Joi.string().label("title"),
  content: Joi.string().label("content"),
  category: Joi.string().label("category"),
  tags: Joi.array().label("tags"),
  meta: Joi.object<IPost["meta"]>().label("meta"),
});

export default {
  "post/create": createPost,
  "post/update": updatePost,
};

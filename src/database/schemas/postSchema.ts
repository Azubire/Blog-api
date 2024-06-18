import Joi, { PartialSchemaMap } from "joi";
import { ICreatePost, IPost } from "../../interfaces/post";

const createPost = Joi.object<ICreatePost>({
  title: Joi.string().required().label("title"),
  content: Joi.string().required().label("content"),
  category: Joi.string().required().label("category"),
  media: Joi.any().label("media"),
  tags: Joi.any().label("tags"),
  metaTitle: Joi.string().label("meta"),
  metaDescription: Joi.string().label("meta"),
  metaKeywords: Joi.string().label("meta"),
});

const updatePost = Joi.object<ICreatePost>({
  title: Joi.string().label("title"),
  content: Joi.string().label("content"),
  category: Joi.string().label("category"),
  media: Joi.any().label("tags"),
  tags: Joi.string().label("tags"),
  metaTitle: Joi.string().label("meta"),
  metaDescription: Joi.string().label("meta"),
  metaKeywords: Joi.string().label("meta"),
});

export default {
  "post/create": createPost,
  "post/update": updatePost,
};

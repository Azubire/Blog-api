import Joi, { PartialSchemaMap } from "joi";
import { IPost } from "../../interfaces/post";

const createPost = Joi.object<PartialSchemaMap<IPost>>({
  title: Joi.string().required().label("title"),
  content: Joi.string().required().label("content"),
  category: Joi.string().required().label("category"),
  tags: Joi.array().required().label("tags"),
  media: Joi.object<IPost["media"]>().required().label("media"),
  meta: Joi.object<IPost["meta"]>().required().label("meta"),
});



export default {
  "post/create": createPost,
};

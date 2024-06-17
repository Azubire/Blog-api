import { Post } from "../src/database/models/post";
import { IPost } from "../src/interfaces/post";

export const createPostHandler = async (data: IPost) => {
  const post = await Post.create({
    ...data,
  });

  return post;
};

export const getPostHandler = async (id: string) => {
  const post = await Post.findById(id);
  return post;
};

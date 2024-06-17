import { Post } from "../database/models/post";
import { IPost } from "../interfaces/post";

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

export const getPostsHandler = async () => {
  const posts = await Post.find();
  return posts;
};

export const getUserPostsHandler = async (id: string) => {
  const posts = await Post.find({ author: id });
  return posts;
};

export const updatePostHandler = async (id: string, data: IPost) => {
  const post = await Post.findByIdAndUpdate(id, data, { new: true });
  return post;
};

export const deletePostHandler = async (id: string) => {
  const post = await Post.findByIdAndDelete(id);
  return post;
};

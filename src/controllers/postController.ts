import { Request, Response } from "restify";

export const getPosts = (req: Request, res: Response) => {
  res.send("posts");
};

export const getPost = (req: Request, res: Response) => {
  res.send("post");
};

export const createPost = (req: Request, res: Response) => {
  res.send("create post");
};

export const updatePost = (req: Request, res: Response) => {
  res.send("update post");
};

export const deletePost = (req: Request, res: Response) => {
  res.send("delete post");
};

export const likePost = (req: Request, res: Response) => {
  res.send("like post");
};

export const sharePost = (req: Request, res: Response) => {
  res.send("share post");
};

export const commentPost = (req: Request, res: Response) => {
  res.send("comment post");
};

export const postComments = (req: Request, res: Response) => {
  res.send("post comments");
};

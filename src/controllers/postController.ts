import { Request, Response, Next } from "restify";
import logger from "../utils/logger";
import { Post } from "../database/models/post";
import { IUser } from "../interfaces/user";
import { createPostHandler } from "../../services/postService";

export const getPosts = async (req: Request, res: Response, next: Next) => {
  res.send("posts");
};

export const getPost = async (req: Request, res: Response, next: Next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json({
      success: true,
      message: "Post fetched successfully",
      post,
    });
  } catch (error) {
    next(error);
  }
};

export const createPost = async (
  req: Request & { session: { user: IUser } },
  res: Response,
  next: Next
) => {
  logger.info({
    body: req.body,
    files: req.files,
  });

  try {
    const post = await createPostHandler({
      ...req.body,
      author: req.session.user,
    });

    res.json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req: Request, res: Response, next: Next) => {
  res.send("update post");
};

export const deletePost = async (req: Request, res: Response, next: Next) => {
  res.send("delete post");
};

export const likePost = async (req: Request, res: Response, next: Next) => {
  res.send("like post");
};

export const sharePost = async (req: Request, res: Response, next: Next) => {
  res.send("share post");
};

export const commentPost = async (req: Request, res: Response, next: Next) => {
  res.send("comment post");
};

export const postComments = async (req: Request, res: Response, next: Next) => {
  res.send("post comments");
};

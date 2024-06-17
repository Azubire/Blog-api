import { Request, Response, Next } from "restify";
import logger from "../utils/logger";
import { Post } from "../database/models/post";
import { IUser } from "../interfaces/user";
import {
  createPostHandler,
  deletePostHandler,
  getPostHandler,
  getPostsHandler,
  updatePostHandler,
} from "../../services/postService";
import { Types } from "mongoose";
import { Comment } from "../database/models/comment";
import { TooManyRequestsError } from "restify-errors";

export const getPosts = async (req: Request, res: Response, next: Next) => {
  try {
    const posts = await getPostsHandler();
    res.json({
      success: true,
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req: Request, res: Response, next: Next) => {
  try {
    logger.info({ params: req.params });

    const post = await getPostHandler(req.params.id);
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
  try {
    const updatedPost = await updatePostHandler(req.params.id, req.body);
    res.json({
      success: true,
      message: "Post updated successfully",
      updatedPost,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req: Request, res: Response, next: Next) => {
  try {
    await deletePostHandler(req.params.id);
    res.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const likePost = async (
  req: Request & { session: { user: IUser } },
  res: Response,
  next: Next
) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {
          likes: req.session.user._id,
        },
      },
      {
        new: true,
      }
    );
    res.json({
      success: true,
      message: "Post liked successfully",
      post,
    });
  } catch (error) {
    next(error);
  }
};

export const unlikePost = async (
  req: Request & { session: { user: IUser } },
  res: Response,
  next: Next
) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          likes: req.session.user._id,
        },
      },
      {
        new: true,
      }
    );
    res.json({
      success: true,
      message: "Post unliked successfully",
      post,
    });
  } catch (error) {
    next(error);
  }
};

export const sharePost = async (req: Request, res: Response, next: Next) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $inc: {
          shares: 1,
        },
      },
      {
        new: true,
      }
    );
    res.json({
      success: true,
      message: "Post shared successfully",
      post,
    });
  } catch (error) {
    next(error);
  }
};

export const commentPost = async (
  req: Request & { session: { user: IUser } },
  res: Response,
  next: Next
) => {
  try {
    const data = {
      content: req.body.content,
      author: req.session.user._id,
      post: req.params.id,
    };

    const comment = await Comment.create(data);

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: comment._id,
        },
      },
      {
        new: true,
      }
    );
    res.json({
      success: true,
      message: "Post commented successfully",
      post,
    });
  } catch (error) {
    next(error);
  }
};

export const postComments = async (req: Request, res: Response, next: Next) => {
  try {
    const comments = await Comment.find({
      post: req.params.id,
    });

    res.json({
      success: true,
      message: "Comments fetched successfully",
      comments,
    });
  } catch (error) {
    next(error);
  }
};

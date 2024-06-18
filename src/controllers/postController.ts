import { Request, Response, Next } from "restify";
import logger from "../utils/logger";
import { Post } from "../database/models/post";
import { IUser } from "../interfaces/user";
import {
  createPostHandler,
  deletePostHandler,
  getPostHandler,
  getPostsHandler,
  getUserPostsHandler,
  updatePostHandler,
} from "../services/postService";
import { Comment } from "../database/models/comment";
import { ICreatePost, IPost } from "../interfaces/post";
import { uploadFile } from "../utils/cloudinary";
import fs from "node:fs";

export const getPosts = async (req: Request, res: Response, next: Next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const posts = await getPostsHandler(limit, offset);
    const total = await Post.countDocuments({});
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      message: "Posts fetched successfully",
      data: {
        posts,
        pagination: {
          page,
          totalPages,
          total,
          limit: limit,
          previousPage: page > 1 ? page - 1 : undefined,
          nextPage: page < totalPages ? page + 1 : undefined,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserPosts = async (
  req: Request & { session: { user: IUser } },
  res: Response,
  next: Next
) => {
  try {
    const posts = await getUserPostsHandler(
      req.session.user._id as unknown as string
    );
    res.json({
      success: true,
      message: "Posts fetched successfully",
      data: { posts },
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
      data: {
        post,
      },
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
  try {
    const postData: Partial<IPost> = {
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      tags: req.body?.tags?.split(","),
      meta: {
        title: req.body?.metaTitle,
        description: req.body?.metaDescription,
        keywords: req.body?.tags?.split(","),
      },
    };

    if (req.files && req.files.media && req.files.media) {
      const filePath = req.files.media.path;
      const arrayBuffer = fs.readFileSync(filePath);
      const file = await uploadFile(
        arrayBuffer,
        req.files.media.type as string,
        "posts"
      );

      logger.info({ file });
      postData.media = {
        url: file.secure_url,
        type: file.resource_type,
      };
    }

    const post = await createPostHandler({
      ...postData,
      author: req.session.user,
    });

    res.json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    logger.info({ error });
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
    }).populate("author");

    res.json({
      success: true,
      message: "Comments fetched successfully",
      data: { comments },
    });
  } catch (error) {
    next(error);
  }
};

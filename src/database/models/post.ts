import { Schema, model } from "mongoose";
import { IUSerMethods, IUser } from "../../interfaces/user";
import bcrypt from "bcrypt";
import { IPost } from "../../interfaces/post";

export const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    content: {
      type: String,
      required: [true, "content is required"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "author is required"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "category is required"],
    },
    tags: {
      type: [String],
    },

    media: {
      type: {
        type: String,
        enum: ["image", "video"],
      },
      url: String,
    },
    meta: {
      description: String,
      keywords: [String],
      title: String,
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: "Comment",
    },
    shares: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Post = model("Post", postSchema);

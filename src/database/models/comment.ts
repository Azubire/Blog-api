import { Schema, model } from "mongoose";
import { IComment } from "../../interfaces/post";

const commentSchema = new Schema<IComment>(
  {
    content: {
      type: String,
      required: [true, "content is required"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "author is required"],
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "post is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Comment = model("Comment", commentSchema);

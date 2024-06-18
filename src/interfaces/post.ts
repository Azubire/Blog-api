import { Types } from "mongoose";
import { IUser } from "./user";

export interface ICategory {
  name: string;
}

export interface IComment {
  content: string;
  author: IUser;
  post: IPost;
}

export interface IPost {
  _id: Types.ObjectId;
  title: string;
  slug?: string;
  meta?: {
    description: string;
    keywords: string[];
    title: string;
  };
  content: string;
  author: IUser;
  category: ICategory;
  tags?: string[];
  media?: {
    type: "image" | "video" | "auto" | "raw";
    url: string;
  };
  likes: Types.ObjectId[] | IUser[];
  comments: Types.ObjectId[] | IComment[];
  shares: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreatePost {
  title: string;
  content: string;
  category: number;
  media?: any;
  tags?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

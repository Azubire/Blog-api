import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  userName: string;
  email: string;
  password: string;
  avatar: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

export interface IUSerMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// interface for user sign up
export interface IAuthSignup {
  userName: string;
  email: string;
  password: string;
}

// interface for user sign in
export interface IAuthLogin {
  email: string;
  password: string;
}

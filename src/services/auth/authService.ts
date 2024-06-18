import { User } from "../../database/models/user";

export const getUserByUserName = async (userName: string) => {
  return await User.findOne({ userName });
};

import { Schema, model } from "mongoose";
import { IUSerMethods, IUser } from "../../interfaces/user";
import bcrypt from "bcrypt";

export const userSchema = new Schema<IUser, {}, IUSerMethods>(
  {
    userName: {
      type: String,
      lowercase: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
    avatar: {
      type: String,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    methods: {
      async comparePassword(candidatePassword: string) {
        return await bcrypt.compare(candidatePassword, this.password);
      },
    },
  }
);

//hash user password before saving model
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

export const User = model("User", userSchema);

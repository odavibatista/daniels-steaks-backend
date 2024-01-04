import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

type CheckPasswordCallback = (err?: Error, isSame?: boolean) => void;

export interface IUser {
  name: string;
  email: string;
  password: string;
  admin: boolean;
}

export interface UserCreationAttributes extends IUser {}

export interface IUserInstance extends Document, IUser {
  checkPassword: (password: string, callbackfn: CheckPasswordCallback) => void;
}

export interface IUserModel extends IUser {}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 10,
      maxlength: 40,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 30,
    },

    admin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  {
    versionKey: false,
  },
);

UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

export default mongoose.model<IUserModel>("User", UserSchema);

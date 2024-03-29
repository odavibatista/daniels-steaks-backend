import e from "express";
import User from "../models/User.js";
import { UserCreationAttributes } from "../models/User.js";
import bcrypt from "bcrypt";

type CheckPasswordCallback = (err?: Error, isSame?: boolean) => void;

const findByEmail = async (email: string) => {
  const user: any = await User.findOne({ email: email })
    .then((user) => (user ? user : null))
    .catch((error) => null)
    .catch((error) => null);

  return user;
};

const create = async (attributes: UserCreationAttributes) => {
  const user = await User.create(attributes);
  return user;
};

const checkPassword = async (
  password: string,
  otherPassword: string,
  callbackfn: CheckPasswordCallback,
) => {
  bcrypt.compare(password, otherPassword, (err, isSame) => {
    if (err) {
      callbackfn(err);
    } else {
      callbackfn(err, isSame);
    }
  });
};

const isAdmin = async (email: string) => {
  const user = await findByEmail(email);
  return user?.admin;
}

export default {
  findByEmail,
  create,
  checkPassword,
  isAdmin
};

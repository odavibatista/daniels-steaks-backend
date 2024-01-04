import mongoose, { Schema } from "mongoose";

export interface IState {
  name: string;
}

export interface IStateModel extends IState {}

const StateSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 30,
    },
  },

  {
    versionKey: false,
  },
);

export default mongoose.model<IStateModel>("State", StateSchema);

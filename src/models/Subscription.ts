import mongoose, { Document, Schema } from "mongoose";

export interface ISubscription {
  name: string;
  email: string;
}

export interface SubscriptionCreationAttributes extends ISubscription {}

export interface ISubscriptionInstance extends Document, ISubscription {}

export interface ISubscriptionModel extends ISubscription {}

const SubscriptionSchema: Schema = new Schema(
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
  },

  {
    versionKey: false,
  },
);

export default mongoose.model<ISubscriptionModel>(
  "Subscription",
  SubscriptionSchema,
);

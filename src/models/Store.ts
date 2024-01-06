import mongoose, { Document, Schema } from "mongoose";

export interface IStore {
  name: string;
  address: string;
  phone: string;
  city: string;
  state: string;
  imgUrl: string;
}

export interface IStoreModel extends IStore, Document {}

const StoreSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    required: true,
    maxlength: 2,
  },

  imgUrl: {
    type: String,
    required: false,
  },
});

export default mongoose.model<IStoreModel>("Store", StoreSchema);

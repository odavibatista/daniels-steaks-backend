import mongoose, { Document, Schema } from "mongoose";

export interface User   {
    name: string
    email: string
    password: string
    admin: boolean   
}

export interface UserModel extends User, Document {}

const UserSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 30
        },
        
        email: {
            type: String,
            required: true,
            unique: true,
            minlength: 10,
            maxlength: 40
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 30
        },

        admin: {
            type: Boolean,
            required: true,
            default: false
        }
    },

    {
        versionKey: false
    }
)

export default mongoose.model<UserModel>("User", UserSchema)
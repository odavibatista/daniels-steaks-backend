import mongoose, { Model, Schema } from "mongoose";

type CheckPasswordCallback = (err?: Error, isSame?: boolean) => void

export interface IUser   {
    name: string
    email: string
    password: string
    admin: boolean   
}

export interface UserCreationAttributes extends IUser {}

export interface IUserInstance extends Model<IUser, UserCreationAttributes> {
    checkPassword: (password: string, callback: CheckPasswordCallback) => void
}

export interface IUserModel extends IUser {}

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

export default mongoose.model<IUserModel>("User", UserSchema)
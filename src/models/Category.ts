import mongoose, { Schema } from "mongoose"

export interface ICategory   {
    name: string
    description: string
}

export interface ICategoryModel extends ICategory {}

const CategorySchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 30
        },
        
        description: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 40
        }
    },

    {
        versionKey: false
    }
)

export default mongoose.model<ICategoryModel>("User", CategorySchema)

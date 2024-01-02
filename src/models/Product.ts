import mongoose, { Document, Schema } from 'mongoose'

export interface IProduct   {
    title: string
    description: string
    price: number
    imgUrl: string
    category: string
}

export interface IProductModel extends IProduct, Document {}

const ProductSchema: Schema = new Schema({
        title:  {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },
        
        price: {
            type: Number,
            required: true
        },

        imgUrl: {
            type: String,
            required: true
        },

        category: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Category"
        },

        featured:   {
            type: Boolean,
            default: false
        }
    },

    {
        timestamps: true,
        versionKey: false
    }
)

export default mongoose.model<IProductModel>("Product", ProductSchema)
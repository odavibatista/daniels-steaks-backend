import Product from "../models/Product";
import { ProductCreationAttributes } from "../models/Product";

const findByName = async (title: string) => {
    const products: any = await
    Product.find({ title: { $regex: title, $options: "i" }  })
        .then((products) => (products ? products : null))
        .catch((error) => null)
        .catch((error) => null);

    return products
}

const create = async (attributes: ProductCreationAttributes) => {
    const product = await Product.create(attributes);
    return product;
};

export default {
    findByName,
    create,
};
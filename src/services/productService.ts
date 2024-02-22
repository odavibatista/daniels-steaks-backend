import Product from "../models/Product.js";
import { ProductCreationAttributes } from "../models/Product.js";

const findByName = async (title: string) => {
  const products: any = await Product.find({
    title: { $regex: title, $options: "i" },
  })
    .then((products) => (products ? products : null))
    .catch((error) => null)
    .catch((error) => null);

  return products;
};

const create = async (attributes: ProductCreationAttributes) => {
  const product = await Product.create(attributes);
  return product;
};

const findFeatured = async () => {
  const products: any = await Product.find({ featured: true })
    .then((products) => (products ? products : null))
    .catch((error) => null)
    .catch((error) => null);

  return products;
};

export default {
  findByName,
  create,
  findFeatured,
};

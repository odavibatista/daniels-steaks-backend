import Store from "../models/Store.js";

const findByState = async (state: string) => {
  const stores: any = await Store.find({
    state: { $regex: state, $options: "i" },
  })
    .then((stores) => (stores ? stores : null))
    .catch((error) => null)
    .catch((error) => null);

  return stores;
};

export default {
  findByState,
};

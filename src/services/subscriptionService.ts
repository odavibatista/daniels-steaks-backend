import Subscription, {
  SubscriptionCreationAttributes,
} from "../models/Subscription.js";
import Logging from "../library/Logging.js";

const create = async (attributes: SubscriptionCreationAttributes) => {
  Logging.data(
    `Tentativa de criação de inscrição para o email: ${attributes.email}`,
  );

  const subscription = await Subscription.create(attributes);

  return subscription;
};

const findAll = async () => {
  Logging.data(`Tentativa de busca de todas as inscrições`);

  const subscriptions: any = await Subscription.find()

    .then((subscriptions) => (subscriptions ? subscriptions : null))
    .catch((error) => null)
    .catch((error) => null);

  return subscriptions;
};

const remove = async (id: string) => {
  Logging.data(`Tentativa de deleção de inscrição com id: ${id}`);

  const subscription = await Subscription.findByIdAndDelete(id);

  return subscription;
};

export default {
  create,
  findAll,
  remove,
};

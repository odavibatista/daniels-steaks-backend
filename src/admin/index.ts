import AdminJS, { AdminJSOptions, ResourceWithOptions } from "adminjs";
import AdminJSExpress from '@adminjs/express';
import * as AdminJSMongoose from '@adminjs/mongoose';
import User from "../models/User.js";
import Subscription from "../models/Subscription.js";
import Store from "../models/Store.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const userRes: ResourceWithOptions = {
  resource: User,
  options: { properties: { content: { type: 'richtext' } } }
}

const adminOptions: AdminJSOptions = {
  resources: [userRes]
};

const admin = new AdminJS(adminOptions);

export const adminRouter = AdminJSExpress.buildRouter(admin);

export default admin;
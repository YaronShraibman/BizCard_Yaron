import Joi from "joi";
import { IAddress, IImage, IName, IUser } from "../db/types/db";
import { patterns } from "./regex-patterns";

export const joiUserSchema = Joi.object<IUser>({
  //rules for validation
  email: Joi.string().email().min(5).max(30).required(),
  password: Joi.string()
    .pattern(patterns.password)
    .min(8)
    .max(30)
    .required(),
  isBusiness: Joi.boolean().required(),
  phone: Joi.string()
    .pattern(patterns.phone)
    .min(9)
    .max(11)
    .required(),
  name: Joi.object<IName>({
    first: Joi.string().min(2).max(256).required(),
    middle: Joi.string().min(2).max(256),
    last: Joi.string().min(2).max(256).required(),
  }),
  address: Joi.object<IAddress>({
    country: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    street: Joi.string().min(2).max(256).required(),
    state: Joi.string().min(2).max(256),
    zip: Joi.number().required(),
    houseNumber: Joi.number().required(),
  }),
  image: Joi.object<IImage>({
    alt: Joi.string().min(2).max(256),
    url: Joi.string().uri().min(14).max(256)
  }),
});

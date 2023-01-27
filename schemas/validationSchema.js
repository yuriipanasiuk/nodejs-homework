const Joi = require('joi');

const contactValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const statusContactValidationSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const userValidationSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
  token: Joi.string(),
});

const subscriptionUserValidationSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

const userEmailValidation = Joi.object({
  email: Joi.string().required(),
});

module.exports = {
  contactValidationSchema,
  statusContactValidationSchema,
  userValidationSchema,
  subscriptionUserValidationSchema,
  userEmailValidation,
};

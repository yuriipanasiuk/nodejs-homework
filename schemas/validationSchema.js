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

module.exports = {
  contactValidationSchema,
  statusContactValidationSchema,
};

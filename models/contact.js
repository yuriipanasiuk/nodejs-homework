const { Schema, model, SchemaTypes } = require('mongoose');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },

  { versionKey: false }
);

const Contact = model('contact', contactSchema);

module.exports = Contact;

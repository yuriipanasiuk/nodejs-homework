const contactsOperation = require('../../models/contacts');
const contactsSchema = require('../../schemas/contactsSchema');

const addNewContact = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    const contact = await contactsOperation.addContact(req.body);

    if (error) {
      const error = new Error('missing required name field');
      error.status = 400;
      throw error;
    }

    res.status(201).json({
      status: 'succes',
      code: 201,
      data: {
        result: contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addNewContact;

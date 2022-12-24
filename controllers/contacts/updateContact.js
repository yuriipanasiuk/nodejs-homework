const contactsOperation = require('../../models/contacts');
const contactsSchema = require('../../schemas/contactsSchema');

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);

    if (error) {
      const error = new Error('missing fields');
      error.status = 400;
      throw error;
    }

    const { contactId } = req.params;
    const contact = await contactsOperation.updateContact(contactId, req.body);

    if (!contact) {
      const error = new Error('Not found');
      error.status = 404;
      throw error;
    }

    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;

const contactsOperation = require('../../models/contacts');

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperation.getContactById(contactId);

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

module.exports = getContactById;

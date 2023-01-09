const Contact = require('../models/contact');
const MyError = require('../helpers/myErrors');

const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return next(new MyError('Not found', 404));
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });

    if (!contact) {
      return next(new MyError('Not found', 404));
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const addNewContact = async (req, res, next) => {
  try {
    const result = await Contact.create(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndRemove(contactId);

    if (!contact) {
      return next(new MyError('Not found', 404));
    }

    res.json({
      message: `contact deleted`,
    });
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const contact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });

    if (!contact) {
      return next(new MyError('Not found', 404));
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addNewContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
  updateStatusContact,
};

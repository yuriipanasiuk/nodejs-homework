const Contact = require('../models/contact');
const MyError = require('../helpers/myErrors');
//TODO: add filtre favorite
const getContacts = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const contacts = await Contact.find({ owner: _id }, '', {
      skip,
      limit: Number(limit),
    }).populate('owner', '_id name email');
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
    const { _id } = req.user;
    const result = await Contact.create({ ...req.body, owner: _id });

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

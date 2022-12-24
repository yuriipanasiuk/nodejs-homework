const getContacts = require('./getContacts');
const getContactById = require('./getContactById');
const addNewContacts = require('./addNewContact');
const deleteContact = require('./deleteContact');
const updateContact = require('./updateContact');

module.exports = {
  getContacts,
  getContactById,
  addNewContacts,
  deleteContact,
  updateContact,
};

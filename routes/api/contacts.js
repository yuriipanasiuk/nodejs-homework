const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/contactsControllers');
const validation = require('../../schemas/validation');
const { contactsSchema, statusContactSchema } = require('../../schemas/validationSchema');

const {
  getContacts,
  getContactById,
  addNewContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = controllers;

router.get('/', getContacts);

router.get('/:contactId', getContactById);

router.post('/', validation(contactsSchema), addNewContact);

router.delete('/:contactId', deleteContact);

router.put('/:contactId', validation(contactsSchema), updateContact);

router.patch('/:contactId/favorite', validation(statusContactSchema), updateStatusContact);

module.exports = router;

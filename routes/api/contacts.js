const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/contactsControllers');
const validation = require('../../schemas/validation');
const { contactsSchema, favoriteSchema } = require('../../schemas/validationSchema');

const { getContacts, getContactById, addNewContact, deleteContact, updateContact, updateFavorite } =
  controllers;

router.get('/', getContacts);

router.get('/:contactId', getContactById);

router.post('/', validation(contactsSchema), addNewContact);

router.delete('/:contactId', deleteContact);

router.put('/:contactId', validation(contactsSchema), updateContact);

router.patch('/:contactId/favorite', validation(favoriteSchema), updateFavorite);

module.exports = router;

const express = require('express');
const router = express.Router();

const controllers = require('../../controllers');

const { getContacts, getContactById, addNewContacts, deleteContact, updateContact } = controllers;

router.get('/', getContacts);

router.get('/:contactId', getContactById);

router.post('/', addNewContacts);

router.delete('/:contactId', deleteContact);

router.put('/:contactId', updateContact);

module.exports = router;

const express = require('express');
const router = express.Router();
const validation = require('../../schemas/validation');
const {
  getContacts,
  getContactById,
  addNewContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require('../../controllers/contactsControllers');
const {
  contactValidationSchema,
  statusContactValidationSchema,
} = require('../../schemas/validationSchema');

router.get('/', getContacts);

router.get('/:contactId', getContactById);

router.post('/', validation(contactValidationSchema), addNewContact);

router.delete('/:contactId', deleteContact);

router.put('/:contactId', validation(contactValidationSchema), updateContact);

router.patch(
  '/:contactId/favorite',
  validation(statusContactValidationSchema),
  updateStatusContact
);

module.exports = router;

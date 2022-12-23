const express = require('express');
const router = express.Router();
const contactsOperation = require('../../models/contacts');
const { listContacts, getContactById, removeContact, addContact, updateContact } =
  contactsOperation;

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

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
});

router.post('/', async (req, res, next) => {
  try {
    const contact = await addContact(req.body);

    if (!contact) {
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
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);

    if (!contact) {
      const error = new Error('Not found');
      error.status = 404;
      throw error;
    }

    res.json({
      status: 'success',
      code: 200,
      message: `contact deleted`,
      data: {
        result: contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await updateContact(contactId);
  res.json({ message: 'template message' });
});

module.exports = router;

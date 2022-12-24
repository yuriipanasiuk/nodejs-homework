const express = require('express');
const router = express.Router();
const Joi = require('joi');

const contactsOperation = require('../../models/contacts');

const { listContacts, getContactById, removeContact, addContact, updateContact } =
  contactsOperation;

const contactsShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

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
    const { error } = contactsShema.validate(req.body);
    const contact = await addContact(req.body);

    if (error) {
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
  try {
    const { error } = contactsShema.validate(req.body);

    if (error) {
      const error = new Error('missing fields');
      error.status = 400;
      throw error;
    }

    const { contactId } = req.params;
    const contact = await updateContact(contactId, req.body);

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

module.exports = router;

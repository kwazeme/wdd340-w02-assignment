const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');

var express = require('express');
var router = express.Router();


// The get contacts method
router.get('/', (req, res, next) => {
  // call the contact model find() method to get all contact in the collection
  Contact.find()
    .populate('group')
    .then(contacts => {
      res.status(200).json({
        message: 'Contacts Fstched successfully',
        contacts: contacts
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Error fetching messages, try again',
        error: error
      });
    });

});

// Post Contact into the contacts collection
router.post('/', (req, res, next) => {
  const maxContactId = sequenceGenerator.nextId("messages");

  const contact = new Contact({
    id: maxContactId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageurl: req.body.imageurl,
    group: req.body.group
  });

  contact.save()
    .then(createdContact => {
      res.status(201).json({
        message: 'Contact added successfully',
        document: createdContact
      });
    })
    .catch(error => {
       res.status(500).json({
          message: 'An error occurred',
          error: error
        });
    });
});

// Update method for message in messages collection
router.put('/:id', (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then(contact => {
      contact.name = req.body.name;
      contact.email = req.body.email;
      contact.phone = req.body.phone;
      contact.imageurl = req.body.imageurl;
      contact.phone = req.body.phone;
      contact.group = req.body.group;

      Contact.updateOne({ id: req.params.id }, contact)
        .then(result => {
          res.status(204).json({
            message: 'Contact updated successfully'
          })
        })
        .catch(error => {
           res.status(500).json({
           message: 'An error occurred',
           error: error
         });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Contact not found.',
        error: { document: 'Contact not found', error}
      });
    });
});

// Delete method to delete a contact from the contacts collections
router.delete("/:id", (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then(contact => {
      Message.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Contact deleted successfully"
          });
        })
        .catch(error => {
           res.status(500).json({
           message: 'An error occurred',
           error: error
         });
        })
    })
    .catch(error => {
      res.status(500).json({
        message: 'Contact not found.',
        error: { document: 'Contact not found', error}
      });
    });
});







module.exports = router;

const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');

var express = require('express');
var router = express.Router();


// The get messages method
router.get('/', (req, res, next) => {
  // call the messages model find() method to get all messages in the collection
  Message.find()
    .then(messages => {
      res.status(200).json({
        message: 'Messages Fetched successfully',
        object: messages
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Error fetching messages, try again',
        error: error
      });
    });

});

// Post Messages into the messages collection
router.post('/', (req, res, next) => {
  const maxMessageId = sequenceGenerator.nextId("messages");

  const message = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender
  });

  message.save()
    .then(createdMessage => {
      res.status(201).json({
        message: 'Message added successfully',
        object: createdMessage
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
  Message.findOne({ id: req.params.id })
    .then(message => {
      message.subject = req.body.subject;
      message.msgText = req.body.msgText;
      message.sender = req.body.sender;

      Message.updateOne({ id: req.params.id }, message)
        .then(result => {
          res.status(204).json({
            message: 'Message updated successfully'
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
      res.status(404).json({
        message: 'Message not found.',
        error: { error}
      });
    });
});

// Delete method to delete a message from the messages collections
router.delete("/:id", (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then(message => {
      Message.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Message deleted successfully"
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
      res.status(404).json({
        message: 'Message not found.',
        error: {error}
      });
    });
});





module.exports = router;

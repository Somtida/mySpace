'use strict';

const express = require('express');
let Message = require('../models/message');

let router = express.Router();

router.route('/')
  .get((req, res)=>{
    Message.find({})
    .populate('user')
    .exec((err, messages)=>{
      res.status(err ? 400 : 200).send(err || messages);
    })
  })
  .post((req,res)=>{
    Message.create(req.body, (err, message)=>{
      res.status(err ? 400 : 200).send(err || message);
    })
  })


router.route('/:id')
  .get((req, res)=>{
    Message.findById(req.params.id, (err, message)=>{
      if(err) return res.status(400).send(err);

      if(!message) return res.status(404).send({error: 'Message not found'});

      res.status(err ? 400 : 200).send(err);
    })
  })

router.put('/:messageId/addUser/:userId', (req, res)=>{
  Message.addUser(req.params.messageId, req.params.userId, (err, savedMessage)=>{
    res.status(err ? 400 : 200).send(err || savedMessage);
  })
})

module.exports = router;

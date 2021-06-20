const express = require('express');
const router = express.Router();
const person = require('../controllers/person');
const catchAsync = require('../utils/catchAsync');

router.route('/')
  .get(catchAsync(person.index))
  .post(catchAsync(person.createPerson));

router.route('/:id')
  .get(catchAsync(person.showPerson))
  .put(catchAsync(person.updatePerson))
  .delete(catchAsync(person.deletePerson));




module.exports = router;
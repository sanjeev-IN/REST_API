const express = require('express');
const router = express.Router();
const api = require('../controllers/person');
const catchAsync = require('../utils/catchAsync');

router.route('/')
  .get(catchAsync(api.index))
  .post(catchAsync(api.createPerson));

router.route('/:id')
  .get(catchAsync(api.showPerson))
  .put(catchAsync(api.updatePerson))
  .delete(catchAsync(api.deletePerson));

module.exports = router;
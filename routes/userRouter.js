const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();

router
  .route('/')
  .get(userController.SearchAUser)
  .post(userController.addAUser);

module.exports = router;

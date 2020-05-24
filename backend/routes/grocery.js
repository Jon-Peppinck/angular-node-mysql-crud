const express = require('express');

const groceryController = require('../controllers/grocery');

const router = express.Router();

router.get('/', groceryController.getAllGroceries);

router.post('/', groceryController.postGrocery);

router.put('/', groceryController.putGrocery);

router.delete('/:id', groceryController.deleteGrocery);

module.exports = router;

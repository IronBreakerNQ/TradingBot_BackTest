const express = require('express');
const router = express.Router();

const DataController = require('../../Controllers/DataController');

router.post('/create',DataController.GetData);
module.exports = router;
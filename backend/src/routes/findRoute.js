const express = require('express');
const router = express.Router();

const { finder } = require('../controllers/findCont');

router.post("/", finder)

module.exports = router;
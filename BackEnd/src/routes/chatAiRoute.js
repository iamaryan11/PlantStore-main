const express = require('express');
const aiRouter =  express.Router();

const askAi = require('../controllers/AiChat');

aiRouter.post('/chatwithai', askAi);

module.exports = aiRouter;
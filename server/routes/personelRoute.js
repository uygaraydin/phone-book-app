const express = require('express');
const router = express.Router();

const Personel = require('../controllers/personelController');

/* router.get('/', Personel.getAll); */
router.get('/:id', Personel.getById);
router.post('/search', Personel.search);

module.exports = router;
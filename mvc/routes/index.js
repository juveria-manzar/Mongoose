var express = require('express');
var router = express.Router();
const ctrlIndex = require('../controllers/index');

router.get('/', ctrlIndex.getIndex);
router.get('/heroes', ctrlIndex.getHeroesIndex);
router.get('/create-hero', ctrlIndex.getHeroesForm);


module.exports = router;
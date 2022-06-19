var express = require('express');
var router = express.Router();

// Admin user route. Basic auth to make end point private

router.get('/admin', (req, res) => {
	res.send({ result: 'admin logs in here' });
});

module.exports = router;

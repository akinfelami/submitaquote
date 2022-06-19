const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const api = require('./routes/api');
const port = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', api);

app.get('/*', (req, res) => {
	res.send({ info: 'Backend is Live' });
});

app.listen(port, function () {
	console.log('Runnning on ' + port);
});

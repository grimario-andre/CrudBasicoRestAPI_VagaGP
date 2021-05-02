var config = require('../config.json')[process.env.NODE_ENV || 'dev'];
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var pretty = require('express-prettify');
var queries = require('../queries');

app.use(function (req, res, next) {
  res.header("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, HEAD,POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
  next();
});

app.use(pretty({ query: 'formatted' }));
app.use(bodyParser.json());

var router = express.Router();

app.use(router);

router.get('/produtos', queries.getProdutos);
router.get('/produtos/:id', queries.getMovie);
router.delete('/produtos/:id', queries.deleteMovie);
router.put('/produtos/:id', queries.updateMovie);
router.post('/produtos', queries.createMovie);

app.get('*', function (req, res) {
  res.send('Express API Rest Postgresql');
})

app.listen(config.port, function () {
  console.log('movies.service app listening on port ' + config.port + '!');
})

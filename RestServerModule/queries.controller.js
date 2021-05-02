
var promise = require('bluebird');
var options = {
  promiseLib: promise
};
var pgp = require('pg-promise')(options);

var connectionString = "postgres://postgres:Trustno1@localhost:5432/mock";
var db = pgp(connectionString);

function getprodutos(req, res, next) {
  db.any('SELECT * FROM movie ORDER BY name ASC')
    .then(function (movies) {
      res.status(200)
        .json(movies);
    })
    .catch(function (err) {
      return next(err);
    });
}

function getproduto(req, res, next) {
  var id = parseInt(req.params.id);
  db.one('SELECT * FROM movie WHERE id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          "id": data.id,
          "name": data.name
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function deleteproduto(req, res, next) {
  var id = parseInt(req.params.id);
  db.result('DELETE FROM movie WHERE id = $1', id)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} movie`
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateproduto(req, res, next) {
  var id = req.body.id;
  var name = req.body.name;
  var sql = 'UPDATE movie SET name=$1 WHERE id=' + id + ' RETURNING id,name';
  db.one(sql, [
    name
  ]).then(function (data) {
    res.status(200)
      .json(data);
  })
    .catch(function (err) {
      return next(err);
    });
}

function createproduto(req, res, next) {
  var name = req.body.name;
  var sql = 'INSERT INTO movie (name) VALUES($1) RETURNING id,name';
  db.one(sql, [name])
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getMovies: getprodutos(),
  getMovie: getproduto(),
  deleteMovie: deleteproduto(),
  updateMovie: updateproduto(),
  createMovie: createproduto(),
};

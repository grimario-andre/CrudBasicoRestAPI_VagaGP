
var promise = require('bluebird');
var options = {
  promiseLib: promise
};
var pgp = require('pg-promise')(options);

var connectionString = "postgres://postgres:a1b2c3d4e5@3.137.5.253:5432/LserverReport";
var db = pgp(connectionString);


function getprodutos(req, res, next) {
  console.log('Disparando o Método getprodutos da tabela products')
  db.any('SELECT * FROM products')
    .then(function (products) {
      res.status(200)
        .json(products);
    })
    .catch(function (err) {
      console.log(err)
      return next(err);
    });
}

function getMovie(req, res, next) {
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

function deleteMovie(req, res, next) {
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

function updateMovie(req, res, next) {
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

function createMovie(req, res, next) {
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
  getProdutos: getprodutos,
  getMovie: getMovie,
  deleteMovie: deleteMovie,
  updateMovie: updateMovie,
  createMovie: createMovie,
};

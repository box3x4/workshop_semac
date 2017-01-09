var mongo = require('./db');

var editID;

var editGet = function(req,res,next) {

  mongo.connection(function(err1, db) {

    if (err1) {

      console.log('erro 1.'+err1);

      db.close();

      res.redirect('/');
    } else {

      db.collection('books_col').find({'_id': req.params.id}).toArray(function(err2, doc) {

        if (err2) {

          console.log('erro 2.'+err2);

          db.close();

          res.redirect('/');
        } else {

          editID = req.params.id;

          res.render('edit', {book: doc});

          db.close();
        }
      });
    }
  });
};

var editPost = function(req,res,next) {

  var input = JSON.parse(JSON.stringify(req.body));

  var set = {
    nome: input.nome,
    autor: input.autor,
    editora: input.editora,
    preco: input.preco
  };

  mongo.connection(function(err1, db) {

    if (err1) {

      console.log('erro 1.'+err1);

      db.close();

      res.redirect('/');
    } else {

      db.collection('books_col').update({'_id': editID}, {$set: {
          _id: set.nome,
          autor: set.autor,
          editora: set.editora,
          preco: parseFloat(set.preco)
        }
      },function(err2, r) {

        if (err2) {

          console.log('erro 2.'+err2);

          db.close();

          res.redirect('/');
        } else {

          res.redirect('/');

          db.close();
        }
      });
    }
  });
};

module.exports.get = editGet;
module.exports.post = editPost;

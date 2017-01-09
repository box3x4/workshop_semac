var mongo = require('./db');

var getAdd = function(req,res,next) {

  res.render('add');
};

var postAdd = function(req,res,next) {

  var input = JSON.parse(JSON.stringify(req.body));

  var set = {
    nome: input.nome,
    autor: input.autor,
    editora: input.editora,
    preco: input.preco
  };

  mongo.connection(function(err1, db) {

    if(err1){

      console.log('erro 1.'+err1);

      db.close();
    }
    else {
      db.collection('books_col').insert({'_id': set.nome, 'autor': set.autor, 'editora': set.editora, 'preco': parseFloat(set.preco)}, function(err2, docs) {

        if (err2) {

          console.log('erro 2.'+err2);

          db.close();

          res.redirect('/');
        } else {

          db.close();

          res.redirect('/');
        }
      });
    }
  });
};

module.exports.get = getAdd;
module.exports.post = postAdd;

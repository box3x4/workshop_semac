var mongo = require('./db');

var getIndex = function(req,res,next) {

  mongo.connection(function(err1, db) {

    if(err1){

      console.log('erro 1.'+err1);

      db.close();

      res.redirect('/');
    }

    else {

      db.collection('books_col').find({}).toArray(function(err2, docs) {

        if (err2) {

          console.log('erro 2.'+err2);

          db.close();

          res.redirect('/');
        } else if(docs.length > 0){

          res.render('index', {books: docs});

          db.close();
        } else {

          res.render('index', {books: []});

          db.close();
        }
      });
    }
  });
};

module.exports.get = getIndex;

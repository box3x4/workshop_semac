var mongo = require('./db');

var getView = function(req,res,next) {

  mongo.connection(function(err1,db) {

    if (err1) {

      console.log('erro 1.'+err1);

      db.close();

      res.redirect('/');
    } else {

      db.collection('books_col').find({'_id': req.params.id}).toArray(function(err2,doc) {

        if (err2) {

          console.log('erro 2.'+err2);

          db.close();

          res.redirect('/');
        } else {

          res.render('view', {book: doc});

          db.close();
        }
      });
    }
  });
};

module.exports.get = getView;

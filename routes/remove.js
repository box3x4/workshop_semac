var mongo = require('./db');

var getRemove = function(req,res,next) {

  mongo.connection(function(err1, db) {

    if(err1){

      console.log('erro 1.'+err1);

      db.close();

      res.redirect('/');
    }
    else {

      db.collection('books_col').deleteOne({'_id': req.params.id}, function(err2, r) {

        if(err2){

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

module.exports.get = getRemove;

var express = require('express');
var router = express.Router();
var userChecker = require('../helper/userchecker')
var passwordHash = require('password-hash');

module.exports = function(db) {
  /* GET users listing. */

  router.get('/', userChecker, function(req, res, next) {
    var message = new Array(req.flash('profileMessage')[0])
    db.query (`select * from users where userid = ${req.session.user.userid}`, (err, data) => {
      console.log('data user', data);
      res.render('users/profile', {
        title: "User Profile",
        page: "profile",
        user:req.session.user,
        item: data.rows[0],
        message: message
      });
    })
  });

  router.post('/profile', userChecker, function(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let secretkey = req.body.secretkey; //manager, dll
    let privilege = req.body.privilege;
    let sqlQuery = '';

    //getting FN, LN, Role, FT data
    req.session.user.firstname = firstname
    req.session.user.lastname = lastname
    req.session.user.secretkey = secretkey
    req.session.user.privilege = privilege

    if(req.body.password) {
      password = passwordHash.generate(req.body.password);
      sqlQuery = `UPDATE users SET password = '${password}', firstname = '${firstname}',
      lastname = '${lastname}' WHERE
      userid = '${req.session.user.userid}'`;

      db.query(sqlQuery, function() {
        req.flash('profileMessage', 'password has been changed');
        return res.redirect('/users/profile')
      });

    } else if (req.body.secretkey) {
      secretkey = req.body.secretkey;
      secretkeyQuery = `UPDATE users SET secretkey = '${secretkey}', firstname = '${firstname}',
      lastname = '${lastname}' WHERE
      userid = '${req.session.user.userid}'`;

      db.query(secretkeyQuery, function() {
        req.flash('profileMessage', 'secret key has been changed');
        return res.redirect('/users/profile')
      });

    } else {
      sqlQuery = `UPDATE users SET firstname = '${firstname}',
      lastname = '${lastname}' WHERE
      userid = '${req.session.user.userid}'`;

      db.query(sqlQuery, function() {
        req.flash('profileMessage', 'password has not changed');
        return res.redirect('/users/profile')
      });
    }
  });

  return router;
}

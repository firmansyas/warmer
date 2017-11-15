'use strict'
const express = require('express');
const router = express.Router();
const userChecker = require('../helper/userchecker')


module.exports = function(db) {
  router.get('/', function(req, res, next) {

    res.render('barang/barang', {title: "Data Barang", page: "barang", user:req.session.user} );
  });
  return router;
}

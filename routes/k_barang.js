'use strict'
const express = require('express');
const router = express.Router();
const userChecker = require('../helper/userchecker')


module.exports = function(db) {
  router.get('/', function(req, res, next) {

    res.render('k_barang/k_barang', {title: "Data Kategori Barang", page: "k_barang", user:req.session.user} );
  });
  return router;
}

'use strict'
const express = require('express');
const router = express.Router();
const userChecker = require('../helper/userchecker')


module.exports = function(db) {
  router.get('/', function(req, res, next) {

    res.render('t_penjualan/t_penjualan', {title: "Data Transaksi Penjualan", page: "t_penjualan", user:req.session.user} );
  });
  return router;
}

'use strict'
const express = require('express');
const router = express.Router();
const userChecker = require('../helper/userchecker')


module.exports = function(db) {
  router.get('/', function(req, res, next) {

    res.render('t_pembelian/t_pembelian', {title: "Data Transaksi Pembelian", page: "t_penjualan", user:req.session.user} );
  });
  return router;
}

'use strict'
const express = require('express');
const router = express.Router();
const userChecker = require('../helper/userchecker')


module.exports = function(db) {
  router.get('/', function(req, res, next) {

    res.render('customers/customers', {title: "Data Pelanggan", page: "customers", user:req.session.user} );
  });

  router.get('/add', function(req, res, next) {

    res.render('customers/add', {title: "Tambah Data Pelanggan", page: "customers", user:req.session.user} );
  });

  router.get('/edit', function(req, res, next) {

    res.render('customers/edit', {title: "Edit Data Pelanggan", page: "customers", user:req.session.user} );
  });



  return router;
}

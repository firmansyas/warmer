'use strict'
const express = require('express');
const router = express.Router();
const userChecker = require('../helper/userchecker')


module.exports = function(db) {
  router.get('/', function(req, res, next) {

    res.render('supplier/supplier', {title: "Data Supplier", page: "supplier", user:req.session.user} );
  });
  router.get('/add', function(req, res, next) {

    res.render('supplier/add', {title: "Tambah Data Supplier", page: "supplier", user:req.session.user} );
  });
  router.get('/edit', function(req, res, next) {

    res.render('supplier/edit', {title: "Tambah Data Supplier", page: "supplier", user:req.session.user} );
  });
  return router;
};

'use strict'
const express = require('express');
const router = express.Router();
const userChecker = require('../helper/userchecker')


module.exports = function(db) {
  router.get('/', function(req, res, next) {

    res.render('barang/barang', {title: "Data Barang", page: "barang", user:req.session.user} );
  });

  router.get('/add', function(req, res, next) {

    res.render('barang/add', {title: "Tambah Data Barang", page: "barang", user:req.session.user} );
  });

  router.get('/edit', function(req, res, next) {

    res.render('barang/edit', {title: "Edit Data Barang", page: "barang", user:req.session.user} );
  });

  return router
};

'use strict'
const express = require('express');
const router = express.Router();
const userChecker = require('../helper/userchecker')


module.exports = function(db) {
  router.get('/', function(req, res, next) {
    let barangData = `SELECT * FROM barang`

    db.query(barangData, function (err, barangData) {
      if (err){
        console.log(err);
      }
      res.render('barang/barang', {
        title: "Data Barang",
        page: "barang",
        barangData: barangData.rows,
        user:req.session.user
      });
    });
  });

  //---------------------------------------------------------------//
  router.get('/add', userChecker, function(req, res) {
    db.query("SELECT * FROM users", function(err, barangData) {
      res.render('barang/add', {title: "Tambah Data Barang", page: "barang", barangData: barangData.rows, user:req.session.user} );
    });
  });

  router.get('/add', userChecker, function(req, res) {

  })

  router.get('/edit', function(req, res, next) {

    res.render('barang/edit', {title: "Edit Data Barang", page: "barang", user:req.session.user} );
  });

  router.get('/details', function(req, res, next) {

    res.render('barang/details', {title: "Details Data Barang", page: "barang", user:req.session.user} );
  });

  return router
};

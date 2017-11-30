'use strict'
const express = require('express');
const router = express.Router();
const userChecker = require('../helper/userchecker')


module.exports = function(db) {
  router.get('/', userChecker, function(req, res) {
    let k_barangData = `SELECT * FROM kbarang`
    db.query(k_barangData, function (err, k_barangData) {
      if (err){
        console.log(err);
      }
      res.render('k_barang/k_barang', {
        title: "Data Kategori Barang",
        page: "k_barang",
        k_barangData: k_barangData.rows,
        user:req.session.user
      });
    });
  });

  //---------------------------------------------------------------//
  router.get('/add', userChecker, function(req, res) {
    let query = `SELECT * FROM users`
    db.query(query, function (err, userData) {
      res.render('k_barang/add', {
        title: "Tambah Data Kategori Barang",
        page: "k_barang",
        userData: userData.rows,
        user:req.session.user
      });
    });
  });

  //---------------------------------------------------------------//
  router.post('/add', userChecker, function (req, res) {
    let addData = `INSERT INTO kbarang (kokbarang, nakabar)
    VALUES ('${req.body.kokbarang}', '${req.body.nakabar}')`

    db.query(addData, function (err, addData) {
      if (err){
        console.log(err);
      }
      res.redirect('/k_barang')
    })
  })

  //---------------------------------------------------------------//
  router.get('/edit/:id', userChecker, function(req, res, next) {
    let userData = `SELECT * FROM users`
    db.query(userData, function (err, userData) {
      if (err){
        console.log(err);
      }
      let k_barangData = `SELECT * FROM kbarang WHERE kbarangid = ${req.params.id}`
      db.query(k_barangData, function (err, k_barangData) {
        if(err){
          console.log(err);
        }
        res.render('k_barang/edit', {
          title: "Edit Data Kategori Barang",
          page: "m_barang",
          query: req.query,
          idURL: req.params.id,
          userData: userData.rows,
          k_barangData: k_barangData.rows[0],
          user:req.session.user
        });
      });
    });
  });

  //---------------------------------------------------------------//
  router.post('/edit/:id', userChecker, function (req, res) {
    let editK_barang = `UPDATE kbarang SET kokbarang = '${req.body.kokbarang}',
    nakabar = '${req.body.nakabar}' WHERE kbarangid = ${req.params.id}`;
    db.query(editK_barang, function (err, editK_barang) {
      if (err) {
        console.log(err);
      }
      res.redirect('/k_barang')
    })
  })
  //---------------------------------------------------------------//
  router.get('/delete/:id', userChecker, function (req, res) {
    let deleteK_barang = `DELETE FROM kbarang WHERE kbarangid = ${req.params.id}`
    db.query(deleteK_barang, function (err) {
      if (err){
        console.log(err);
      }
      res.redirect('/k_barang')
    })
  })

  return router;
}

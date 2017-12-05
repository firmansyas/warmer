'use strict'
const express = require('express');
const router = express.Router();
const userChecker = require('../helper/userchecker')


module.exports = function(db) {
  router.get('/', userChecker, function(req, res) {
    db.query (`select * from users where userid = ${req.session.user.userid}`, (err, data) => {
      let k_barangData = `SELECT * FROM kbarang`
      db.query(k_barangData, function (err, k_barangData) {
        if (err){
          console.log(err);
        }
        res.render('k_barang/k_barang', {
          title: "Data Kategori Barang",
          page: "k_barang",
          item: data.rows[0],
          k_barangData: k_barangData.rows,
          user:req.session.user
        })
      });
    });
  });

  //---------------------------------------------------------------//
  router.get('/add', userChecker, function(req, res) {
    db.query (`select * from users where userid = ${req.session.user.userid}`, (err, data) => {
      res.render('k_barang/add', {
        title: "Tambah Data Kategori Barang",
        page: "k_barang",
        item: data.rows[0],
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
    db.query (`select * from users where userid = ${req.session.user.userid}`, (err, data) => {
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
          item: data.rows[0],
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
